from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from debate.models import Debate
from users import models
from users.serializers import RegisterUserSerializer


class DebateSerializer(serializers.ModelSerializer):
    participants = SerializerMethodField()

    class Meta:
        model = Debate
        fields = "__all__"

    def get_participants(self, obj):
        custom_debate_query = models.NewUser.objects.filter(current_debate=obj.id)
        serializer = RegisterUserSerializer(custom_debate_query, many=True)
        return serializer.data
