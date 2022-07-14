from django.db import models

# Create your models here.
from django.utils import timezone


class User(models.Model):

    username = models.CharField(max_length=30, primary_key=True)
    password = models.CharField(max_length=30)
    firstname = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    email = models.CharField(max_length=50)
    birthday = models.DateField(default=timezone.now)

    def __str__(self):
        return self.username
