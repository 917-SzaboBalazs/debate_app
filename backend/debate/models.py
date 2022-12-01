from django.db import models
from django.utils import timezone


class DebateManager(models.Manager):
    def create_debate(self, entry_code, **other_fields):
        other_fields.setdefault('speaker_time', 6)

        return self.create_british_parliamentary_debate(entry_code, **other_fields)

    def create_british_parliamentary_debate(self, entry_code, **other_fields):
        debate = self.model(entry_code=entry_code, **other_fields)

        return debate


class Debate(models.Model):
    entry_code = models.CharField(max_length=8, unique=True)
    type = models.CharField(max_length=50, default="british")

    result = models.CharField(max_length=50, null=True, blank=True)
    status = models.CharField(max_length=50, default="lobby")
    date_time = models.DateTimeField(default=timezone.now)
    motion = models.CharField(max_length=100, null=True, blank=True)

    current_number = models.IntegerField(default=1)

    # options
    speaker_time = models.IntegerField(default=6)

    objects = DebateManager()

    def __str__(self):
        return self.type + "(" + str(self.id) + ")"
