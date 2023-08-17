from django.db import models
from django.utils import timezone


class DebateManager(models.Manager):
    def create_debate(self, entry_code, **other_fields):
        other_fields.setdefault('speaker_time', 7)

        return self.create_british_parliamentary_debate(entry_code, **other_fields)

    def create_british_parliamentary_debate(self, entry_code, **other_fields):
        debate = self.model(entry_code=entry_code, **other_fields)

        return debate


class Debate(models.Model):
    entry_code = models.CharField(max_length=8, unique=True, help_text="Random 4 digits number, uniquely "
                                                                       "identifies every debate.")
    type = models.CharField(max_length=50, default="british", help_text="Default value is <b>british</b>. Other "
                                                                        "possible values: <b>british</b>.")

    result = models.CharField(max_length=200, null=True, blank=True, help_text="Stores the result of the debate. "
                                                                              "Default value is <b>NULL</b>.")
    status = models.CharField(max_length=50, default="lobby", help_text="Signals current status of the debate."
                                                                        "Default value is <b>lobby</b>. Other possible"
                                                                        " values: <b>lobby</b> | <b>running</b> | "
                                                                        "<b>finished</b>.")
    date_time = models.DateTimeField(default=timezone.now, help_text="Stores the creation time of the debate.")
    motion = models.CharField(max_length=100, null=True, blank=True, help_text="Motion can be generated random from"
                                                                               "our database or type manually by"
                                                                               "the host. Default value is "
                                                                               "<b>NULL</b>.")

    current_number = models.IntegerField(default=1, help_text="Indicates the number of the current speaker."
                                                              "You should increase this when a new debater starts"
                                                              "to speak. Default value is <b>1</b>.")

    # options
    speaker_time = models.IntegerField(default=7, help_text="Expresses speakers time in minutes. Default value is "
                                                            "<b>7</b>.")

    objects = DebateManager()

    def __str__(self):
        if self.motion is not None:
            return self.motion + " --- " + self.type + "(id = " + str(self.id) + ")"
        return self.type + "(id =" + str(self.id) + ")"
