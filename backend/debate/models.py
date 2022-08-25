from django.db import models

# Create your models here.
from django.utils import timezone


class Debate(models.Model):
    type = models.CharField(max_length=50)
    entry_code = models.CharField(max_length=8, unique=True)
    winner = models.CharField(max_length=50, default="no winner")
    status = models.CharField(max_length=50, default="lobby")
    date_time = models.DateTimeField(default=timezone.now)

    # options
    team_size = models.IntegerField(default=4)
    no_judges = models.IntegerField(default=3)
    has_chair = models.BooleanField(default=False)

    def __str__(self):
        return self.type
