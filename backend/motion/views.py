import random
import deepl

translator = deepl.Translator("0d0c9849-f76e-58fb-b448-7216f5ffca23:fx")

from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from motion.models import Motion
from motion.serializers import MotionSerializer


class ListMotionsView(generics.ListAPIView):
    """
    get:
        List all the motions.
    """
    queryset = Motion.objects.all()
    serializer_class = MotionSerializer
    permission_classes = [IsAdminUser]


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
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.__generate_random_motion()

    def __generate_random_motion(self):
        available_motions = [motion for motion in self.queryset.all() if Motion.objects.is_available(motion)]

        return random.choice(available_motions)


class MotionDeeplTranslateView(APIView):

    def post(self, request, *args, **kwargs):
        original_motion = request.data.get('motion')
        target_language = request.data.get('target_lang')

        try:
            result = translator.translate_text(original_motion, target_lang=target_language)
            return Response(data={"motion": result.text}, status=status.HTTP_200_OK)

        except deepl.DeepLException as de:
            return Response(data={"message": str(de)}, status=status.HTTP_400_BAD_REQUEST)
