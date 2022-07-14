from django.db import models

# Create your models here.


class User(models.Model):

    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    firstname = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    email = models.CharField(max_length=50)
    age = models.IntegerField(default=0)

    def __str__(self):
        return self.username
