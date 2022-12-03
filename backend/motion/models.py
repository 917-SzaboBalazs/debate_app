from django.db import models


# Create your models here.
from debate.models import Debate


class MotionManager(models.Manager):

    @staticmethod
    def is_available(obj):
        no_selected_motions = Debate.objects.filter(motion__isnull=False).count()
        print("Selected motions: " + str(no_selected_motions))
        selected_times = (Debate.objects.filter(motion=obj.text_in_english) |
                          Debate.objects.filter(motion=obj.text_in_hungarian)).count()

        print("Selected times: " + str(selected_times))

        return no_selected_motions == 0 or selected_times / no_selected_motions < 0.8


class Motion(models.Model):
    text_in_hungarian = models.CharField(max_length=256, null=True, blank=True)
    text_in_english = models.CharField(max_length=256, null=True, blank=True)

    objects = MotionManager()
