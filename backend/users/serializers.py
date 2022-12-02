from rest_framework import serializers

from users.models import NewUser


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        exclude = ['is_superuser', 'is_staff', 'is_active', 'start_date']
        extra_kwargs = {
            'password': {
                'write_only': True,
            },
        }

    def create(self, validated_data):
        return self.Meta.model.objects.create_user(**validated_data)


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        exclude = ['is_superuser', 'is_staff', 'is_active', 'start_date', 'password', ]
