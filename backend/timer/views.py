from countdowntimer_model.models import CountdownTimer
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

from debate.serializers import DebateSerializer
from timer.models import POITime
from timer.serializers import SpeakerTimeSerializer, POISerializer
from users.models import NewUser


class CurrentTimeView(generics.RetrieveUpdateAPIView):

    """
    get:
        Get the attached speaker timer from the current debate.
    patch:
        You can change the timer by passing a state
        (available options: running | paused | reset)
    """

    permission_classes = [AllowAny]
    serializer_class = SpeakerTimeSerializer
    http_method_names = ["patch", "get"]

    def get(self, request, *args, **kwargs):
        cookies = request.COOKIES
        guest_user = None

        if request.user.is_anonymous:
            if 'guest_user' in cookies:
                guest_user_id = cookies['guest_user']
                guest_user = NewUser.objects.get(id=guest_user_id)

            request.user = guest_user

        if request.user.current_debate.timer.remaining_time().seconds == 0:
            request.user.current_debate.timer.state = request.user.current_debate.timer.STATE.PAUSED
            request.user.current_debate.timer.save()

        if request.user.current_debate.timer.state == request.user.current_debate.timer.STATE.RUNNING:
            curr_state = "running"
        else:
            curr_state = "paused"

        return Response(data={
            "remaining-time": request.user.current_debate.timer.remaining_time().seconds,
            "state": curr_state,
        })

    def patch(self, request, *args, **kwargs):
        cookies = request.COOKIES
        guest_user = None

        if request.user.is_anonymous:
            if 'guest_user' in cookies:
                guest_user_id = cookies['guest_user']
                guest_user = NewUser.objects.get(id=guest_user_id)

            request.user = guest_user

        if 'state' in request.data:
            if request.data.get('state') == "paused":
                request.user.current_debate.timer.state = request.user.current_debate.timer.STATE.PAUSED
                request.user.current_debate.timer.save()
                return Response(status=status.HTTP_202_ACCEPTED)

            elif request.data.get('state') == "running":
                request.user.current_debate.timer.state = request.user.current_debate.timer.STATE.RUNNING
                request.user.current_debate.timer.save()
                return Response(status=status.HTTP_202_ACCEPTED)

            elif request.data.get('state') == "reset":
                request.user.current_debate.timer.duration_in_minutes = 0
                request.user.current_debate.timer.save()

                request.user.current_debate.timer.state = request.user.current_debate.timer.STATE.PAUSED
                request.user.current_debate.timer.duration_in_minutes = request.user.current_debate.speaker_time
                request.user.current_debate.timer.save()
                return Response(status=status.HTTP_202_ACCEPTED)

            return Response(data={"detail": "Invalid state option (available options: paused, running, reset)"},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response(data={"detail": "State field is required"}, status=status.HTTP_400_BAD_REQUEST)


class CreatePOITimerView(generics.ListCreateAPIView):
    """
        get:
            Get the attached POI timer from the current debate.
        post:
            Create a POI timer and set the duration to 15 seconds.
    """

    permission_classes = [AllowAny]
    serializer_class = POISerializer

    def post(self, request, *args, **kwargs):
        cookies = request.COOKIES
        guest_user = None

        if request.user.is_anonymous:
            if 'guest_user' in cookies:
                guest_user_id = cookies['guest_user']
                guest_user = NewUser.objects.get(id=guest_user_id)

            request.user = guest_user

        try:
            has_poi = (request.user.current_debate.poi is not None)
        except POITime.DoesNotExist:
            has_poi = False

        if has_poi:
            return Response(data={"detail": "This debate already has a POI"}, status=status.HTTP_400_BAD_REQUEST)

        poi_timer = POITime(debate=request.user.current_debate, duration_in_minutes=0.25,
                            state=CountdownTimer.STATE.RUNNING)
        poi_timer.save()

        return Response(data={
            "remaining-time": poi_timer.remaining_time().seconds,
            "state": poi_timer.get_state_display(),
        })

    def get(self, request, *args, **kwargs):
        cookies = request.COOKIES
        guest_user = None

        if request.user.is_anonymous:
            if 'guest_user' in cookies:
                guest_user_id = cookies['guest_user']
                guest_user = NewUser.objects.get(id=guest_user_id)

            request.user = guest_user

        if request.user.current_debate is None:
            return Response(data={
                "detail": "User not in debate"
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            has_poi = (request.user.current_debate.poi is not None)
        except POITime.DoesNotExist:
            has_poi = False

        if not has_poi:
            return Response(data={
                "detail": "This debate doesn't have a POI"
            }, status=status.HTTP_404_NOT_FOUND)

        if request.user.current_debate.poi.remaining_time().seconds == 0:
            request.user.current_debate.poi.delete()

            return Response(data={
                "remaining-time": 0,
                "state": "paused",
            })

        return Response(data={
            "remaining-time": request.user.current_debate.poi.remaining_time().seconds,
            "state": request.user.current_debate.poi.get_state_display(),
        })
