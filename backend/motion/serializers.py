from rest_framework import serializers

from motion.models import Motion


class MotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motion
        fields = "__all__"
