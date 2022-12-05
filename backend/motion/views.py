import random

from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from motion.models import Motion
from motion.serializers import MotionSerializer


class ListMotionsView(generics.ListAPIView):
    """
    get:
        List all the motions.
    """
    queryset = Motion.objects.all()
    permission_classes = [AllowAny]
    serializer_class = MotionSerializer


class RandomMotionView(generics.RetrieveAPIView):
    """
    get:
        Generate a random available motion and returns it
        both in english and hungarian.
        Available motion means that its pick rate is less
        than 0.8.
    """
    queryset = Motion.objects.all()
    serializer_class = MotionSerializer

    def get_object(self):
        return self.__generate_random_motion()

    def __generate_random_motion(self):
        available_motions = [motion for motion in self.queryset.all() if Motion.objects.is_available(motion)]

        return random.choice(available_motions)
