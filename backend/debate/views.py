from django.http import Http404
from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from debate.models import Debate
from debate.serializers import DebateSerializer


# Create your views here.


class CurrentDebateView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Debate.objects.all()
    serializer_class = DebateSerializer

    def get_object(self):
        if self.request.user.current_debate is None:
            raise Http404

        return get_object_or_404(queryset=self.queryset, id=self.request.user.current_debate.id)


class CreateDebateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Debate.objects.all()
    serializer_class = DebateSerializer
