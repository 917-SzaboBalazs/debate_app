from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from debate.models import Debate
from timer.models import SpeakerTime, POITime
from users import models
from users.serializers import RegisterUserSerializer


class DebateSerializer(serializers.ModelSerializer):
    participants = SerializerMethodField()

    class Meta:
        model = Debate
        fields = "__all__"

    def create(self, validated_data):
        entry_code = validated_data.pop('entry_code', None)

        new_debate = self.Meta.model.objects.create_debate(entry_code, **validated_data)
        new_debate.save()

        new_timer = SpeakerTime.objects.create(debate=new_debate, duration_in_minutes=new_debate.speaker_time)
        new_timer.save()

        return new_debate

    @staticmethod
    def get_participants(obj):
        custom_debate_query = models.NewUser.objects.filter(current_debate=obj.id)
        serializer = RegisterUserSerializer(custom_debate_query, many=True)
        return serializer.data
