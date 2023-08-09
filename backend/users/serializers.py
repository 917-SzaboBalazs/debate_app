from rest_framework import serializers

from users.models import NewUser


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ["username", "email", "password", ]

    def create(self, validated_data):
        return self.Meta.model.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        exclude = ["groups", "user_permissions", ]
        extra_kwargs = {
            'password': {
                'write_only': True,
            },
        }
