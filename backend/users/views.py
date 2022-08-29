from rest_framework import status, generics
from rest_framework.exceptions import ParseError, APIException
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import NewUser
from users.serializers import RegisterUserSerializer, CurrentUserSerializer


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)

        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            if new_user:
                return Response(reg_serializer.data, status=status.HTTP_201_CREATED)

        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class CurrentUserView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CurrentUserSerializer
    queryset = NewUser.objects.all()

    def get_object(self):
        return get_object_or_404(queryset=self.queryset, username=self.request.user)


class GetDebaterByRoleView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CurrentUserSerializer
    queryset = NewUser.objects.all()

    def get_object(self):
        if 'role' not in self.request.query_params:
            raise APIException(detail="Role must be defined", code=400)

        return get_object_or_404(queryset=self.queryset, current_debate=self.request.user.current_debate,
                                 role=self.request.query_params.get('role'))


class GetDebaterByCurrentNumberView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CurrentUserSerializer
    queryset = NewUser.objects.all()

    def get_object(self):
        current_number = self.request.user.current_debate.current_number
        return get_object_or_404(queryset=self.queryset, current_debate=self.request.user.current_debate,
                                 number=current_number)
