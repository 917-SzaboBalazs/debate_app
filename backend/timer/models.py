from django.db import models
from countdowntimer_model.models import CountdownTimer

from debate.models import Debate


class CustomCountdownTimer(CountdownTimer):
    debate = models.OneToOneField(to=Debate, on_delete=models.CASCADE, default=0, related_name="timer")
