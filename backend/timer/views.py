from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class CurrentTimeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(data={
            "remaining-time": request.user.current_debate.timer.remaining_time().seconds
        })

    def patch(self, request):
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
                request.user.current_debate.timer.duration_in_minutes = request.user.current_debate.speaker_time
                request.user.current_debate.timer.save()
                return Response(status=status.HTTP_202_ACCEPTED)

            return Response(data={"detail": "Invalid state option (available options: paused, running, reset)"},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response(data={"detail": "State field is required"}, status=status.HTTP_400_BAD_REQUEST)
