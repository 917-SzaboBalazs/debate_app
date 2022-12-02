import random
import string

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, CreateAPIView, RetrieveUpdateAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from debate.models import Debate
from debate.serializers import DebateSerializer


# Create your views here.
from users.models import NewUser


class CreateDebateView(CreateAPIView):
    """
    post:
        Create a british parliamentary debate by default. You don't have to pass any arguments.
    """

    permission_classes = [AllowAny]
    serializer_class = DebateSerializer
    queryset = Debate.objects.all()

    def post(self, request, *args, **kwargs):
        cookies = self.request.COOKIES
        guest_user = None

        entry_code = self.__generate_random_unique_code()

        custom_data = request.data
        custom_data['entry_code'] = entry_code

        serializer = self.serializer_class(data=custom_data)

        if serializer.is_valid():
            new_debate = serializer.save()

            if self.request.user.is_anonymous:
                if 'guest_user' in cookies:
                    guest_user_name = cookies['guest_user']
                    guest_user = NewUser.objects.get(username=guest_user_name)

                if guest_user is None:
                    guest_user = NewUser.objects.create_guest_user()
                    guest_user.save()

                self.request.user = guest_user

            self.request.user.current_debate = new_debate
            self.request.user.save()

            response = Response(serializer.data, status=status.HTTP_201_CREATED)

            if guest_user:
                response.set_cookie('guest_user', guest_user)

            return response
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
        cookies = self.request.COOKIES
        guest_user = None

        if "entry-code" in self.request.query_params and self.request.query_params.get("entry-code") is not None:
            new_debate = get_object_or_404(queryset=self.queryset,
                                           entry_code=self.request.query_params.get("entry-code"))

            if self.request.user.is_anonymous:
                if 'guest_user' in cookies:
                    guest_user_name = cookies['guest_user']
                    guest_user = NewUser.objects.get(username=guest_user_name)

                if guest_user is None:
                    guest_user = NewUser.objects.create_guest_user()
                    guest_user.save()

                self.request.user = guest_user

            self.request.user.current_debate = new_debate
            self.request.user.save()

            serializer = DebateSerializer(new_debate)

            response = Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)

            if guest_user:
                response.set_cookie('guest_user', guest_user)

            return response

        if self.request.user.is_anonymous:
            if 'guest_user' in cookies:
                guest_user_name = cookies['guest_user']
                guest_user = NewUser.objects.get(username=guest_user_name)

            self.request.user = guest_user

        if self.request.user is None:
            return Response(data={"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # code not entered, user not in debate
        if self.request.user and self.request.user.current_debate is None:
            return Response(data={"detail": "User not in debate"}, status=status.HTTP_404_NOT_FOUND)

        # code not entered, user in debate, return debate
        current_debate = get_object_or_404(queryset=self.queryset,
                                           id=self.request.user.current_debate.id)

        serializer = DebateSerializer(current_debate)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def patch(self, request, *args, **kwargs):
        if self.request.user.current_debate is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        current_debate = self.queryset.filter(id=self.request.user.current_debate.id)[0]

        serializer = self.serializer_class(current_debate, data=self.request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)
