from rest_framework import serializers

from timer.models import POITime, SpeakerTime


class SpeakerTimeSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpeakerTime
        fields = "__all__"


class POISerializer(serializers.ModelSerializer):

    class Meta:
        model = POITime
        fields = "__all__"
