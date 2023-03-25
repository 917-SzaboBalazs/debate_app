from rest_framework import serializers

from users.models import NewUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = "__all__"
        extra_kwargs = {
            'password': {
                'write_only': True,
            },
        }

    def create(self, validated_data):
        if 'guest' in validated_data and validated_data['guest']:
            return self.Meta.model.objects.create_guest_user()

        return self.Meta.model.objects.create_user(**validated_data)
