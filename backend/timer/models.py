from django.db import models
from countdowntimer_model.models import CountdownTimer

from debate.models import Debate


class SpeakerTime(CountdownTimer):
    debate = models.OneToOneField(to=Debate, on_delete=models.CASCADE, default=0, related_name="timer")


class POITime(CountdownTimer):
    debate = models.OneToOneField(to=Debate, on_delete=models.CASCADE, default=0, related_name="poi")
