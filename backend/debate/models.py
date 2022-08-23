from django.db import models

# Create your models here.
from users.models import NewUser


class Debate(models.Model):
    type = models.CharField(max_length=50)
    winner = models.CharField(max_length=50, default="no winner")

    is_finished = models.BooleanField(default=False)


class Participant(models.Model):
    user = models.OneToOneField(to=NewUser, on_delete=models.PROTECT)
    role = models.CharField(max_length=50)
    current_debate = models.ForeignKey(to=Debate, on_delete=models.PROTECT)
