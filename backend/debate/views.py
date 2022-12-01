import random
import string

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from debate.models import Debate
from debate.serializers import DebateSerializer


# Create your views here.

class CreateDebateView(CreateAPIView):
    """
    post:
        Create a british parliamentary debate by default. You don't have to pass any arguments.
    """

    permission_classes = [AllowAny]
    serializer_class = DebateSerializer
    queryset = Debate.objects.all()

    def post(self, request, *args, **kwargs):
        entry_code = self.__generate_random_unique_code()

        custom_data = request.data
        custom_data['entry_code'] = entry_code

        serializer = self.serializer_class(data=custom_data)

        if serializer.is_valid():
            new_debate = serializer.save()

            self.request.user.current_debate = new_debate
            self.request.user.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def __generate_random_unique_code(self):
        random_string = ''.join(random.choices(string.digits, k=4))
        debate_with_same_code = self.queryset.filter(entry_code=random_string)

        while len(debate_with_same_code) != 0:
            random_string = ''.join(random.choices(string.digits, k=4))
            debate_with_same_code = self.queryset.filter(entry_code=random_string)

        return random_string


class RetrieveUpdateCurrentDebateView(RetrieveUpdateAPIView):
    """
    get:
        Returns the user's current debate. You can choose from 2 options.
        1. Pass the entry-code: this will assign the user to the proper debate and return it.
        2. Don't pass anything: this will return user's current debate.
        If entry-code is not valid (in the 1st case) or the user doesn't have a debate assigned to it
        (in the 2nd case), the function will raise an HTTP_404_NOT_FOUND error.
    patch:
        You can change any field by passing the name of the argument and the new value as a json object.
    """

    permission_classes = [AllowAny]
    serializer_class = DebateSerializer
    queryset = Debate.objects.all()
    http_method_names = ["patch", "get"]

    def get(self, request, *args, **kwargs):
        # code entered, assign user to debate
        if "entry-code" in self.request.query_params and self.request.query_params.get("entry-code") is not None:

            new_entry_code = self.request.query_params.get("entry-code")
            new_debate_dict = self.queryset.filter(entry_code=new_entry_code)

            if len(new_debate_dict) == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)

            new_debate = new_debate_dict.values()[0]

            self.request.user.current_debate = new_debate_dict[0]
            self.request.user.save()

            return Response(data=new_debate, status=status.HTTP_202_ACCEPTED)

        # code not entered, user not in debate
        if self.request.user.current_debate is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # code not entered, user in debate, return debate
        current_debate = self.queryset.filter(id=self.request.user.current_debate.id)

        current_debate = current_debate.values()[0]

        return Response(current_debate, status=status.HTTP_202_ACCEPTED)

    def patch(self, request, *args, **kwargs):
        if self.request.user.current_debate is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        current_debate = self.queryset.filter(id=self.request.user.current_debate.id)[0]

        serializer = self.serializer_class(current_debate, data=self.request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)
