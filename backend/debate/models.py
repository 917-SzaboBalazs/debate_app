from django.db import models

# Create your models here.
from django.utils import timezone


class Debate(models.Model):
    type = models.CharField(max_length=50)
    entry_code = models.CharField(max_length=8)
    winner = models.CharField(max_length=50, default="no winner")
    status = models.CharField(max_length=50, default="lobby")
    date_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.type
