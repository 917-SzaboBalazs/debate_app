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

    def create(self, validated_data):
        type = validated_data.pop('type', None)
        entry_code = validated_data.pop('entry_code', None)
        motion = validated_data.pop('motion', None)
        instance = self.Meta.model.objects.create_debate(type, entry_code, motion, **validated_data)
        instance.save()

        return instance

    def get_participants(self, obj):
        custom_debate_query = models.NewUser.objects.filter(current_debate=obj.id)
        serializer = RegisterUserSerializer(custom_debate_query, many=True)
        return serializer.data
