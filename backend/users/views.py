import string

from rest_framework import status, generics
from rest_framework.exceptions import ParseError
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import NewUser
from users.serializers import UserSerializer


class ListCreateUsersView(generics.ListCreateAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = NewUser.objects.all()

        # Filter based on role in a debate

        if "role" in self.request.query_params:
            if self.request.user.is_authenticated and self.request.user.current_debate:
                queryset = queryset.filter(role=self.request.query_params["role"],
                                           current_debate=self.request.user.current_debate)
            else:
                return []

        # Filter based on number in a debate

        if "number" in self.request.query_params:
            if self.request.user.is_authenticated and self.request.user.current_debate:
                queryset = queryset.filter(number=self.request.query_params["number"],
                                           current_debate=self.request.user.current_debate)
            else:
                return []

        return queryset


class RetrieveUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    queryset = NewUser.objects.all()

    def get_object(self, pk=None):
        if self.kwargs.get("pk") is None:
            return get_object_or_404(self.get_queryset(), id=self.request.user.id)

        return get_object_or_404(self.get_queryset(), id=self.kwargs.get("pk"))


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
