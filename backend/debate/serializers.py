from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from debate.models import Debate
from timer.models import CustomCountdownTimer
from users import models
from users.serializers import RegisterUserSerializer


class DebateSerializer(serializers.ModelSerializer):
    participants = SerializerMethodField()

    class Meta:
        model = Debate
        fields = "__all__"

    def create(self, validated_data):
        type = validated_data.pop('type', None)
        entry_code = validated_data.pop('entry_code', None)
        motion = validated_data.pop('motion', None)

        new_debate = self.Meta.model.objects.create_debate(type, entry_code, motion, **validated_data)
        new_debate.save()

        new_timer = CustomCountdownTimer.objects.create(debate=new_debate, duration_in_minutes=new_debate.speaker_time)
        new_timer.save()

        return new_debate

    def get_participants(self, obj):
        custom_debate_query = models.NewUser.objects.filter(current_debate=obj.id)
        serializer = RegisterUserSerializer(custom_debate_query, many=True)
        return serializer.data
