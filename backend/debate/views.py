import random
import string

from django.http import Http404
from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from debate.models import Debate
from debate.serializers import DebateSerializer


# Create your views here.


class CurrentDebateView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Debate.objects.all()
    serializer_class = DebateSerializer

    def get_object(self):
        if "entry-code" in self.request.query_params and self.request.query_params.get("entry-code") is not None:
            new_debate = get_object_or_404(queryset=self.queryset, entry_code=self.request.query_params.get("entry-code"))
            self.request.user.current_debate = new_debate
            self.request.user.save()
            return new_debate

        if self.request.user.current_debate is None:
            raise Http404

        return get_object_or_404(queryset=self.queryset, id=self.request.user.current_debate.id)


class CreateDebateView(APIView):
    permission_classes = [IsAuthenticated]
    queryset = Debate.objects.all()

    def post(self, request):
        entry_code = self.generate_random_unique_code()

        custom_data = {
            "type": request.data['type'],
            "entry_code": entry_code
        }

        serializer = DebateSerializer(data=custom_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_random_unique_code(self):
        random_string = ''.join(random.choices(string.ascii_lowercase, k=8))
        debate_with_same_code = self.queryset.filter(entry_code=random_string)

        while len(debate_with_same_code) != 0:
            random_string = ''.join(random.choices(string.ascii_lowercase, k=8))
            debate_with_same_code = self.queryset.filter(entry_code=random_string)

        return random_string
