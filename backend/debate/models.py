from django.db import models
from django.utils import timezone


class DebateManager(models.Manager):
    def create_debate(self, type, entry_code, motion, **other_fields):
        other_fields.setdefault('no_judges', 3)
        other_fields.setdefault('has_chair', False)
        other_fields.setdefault('speaker_time', 6)

        if type == "british":
            return self.create_british_parliamentary_debate(type, entry_code, motion, **other_fields)
        return None

    def create_british_parliamentary_debate(self, type, entry_code, motion, **other_fields):
        other_fields['team_size'] = 4

        debate = self.model(type=type, entry_code=entry_code, motion=motion, **other_fields)

        return debate


class Debate(models.Model):
    type = models.CharField(max_length=50)
    entry_code = models.CharField(max_length=8, unique=True)
    winner = models.CharField(max_length=50, default="no winner")
    status = models.CharField(max_length=50, default="lobby")
    date_time = models.DateTimeField(default=timezone.now)
    motion = models.CharField(max_length=100)

    current_number = models.IntegerField(default=1)

    # options
    team_size = models.IntegerField(default=1)
    no_judges = models.IntegerField(default=1)
    has_chair = models.BooleanField(default=False)
    speaker_time = models.IntegerField(default=6)

    objects = DebateManager()

    def __str__(self):
        return self.type + "(" + str(self.id) + ")"
