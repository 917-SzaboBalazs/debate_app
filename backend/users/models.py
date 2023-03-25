import random

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.db.models import Q
from django.utils import timezone

from debate.models import Debate


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, username, email, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')

        return self.create_user(username, email, password, **other_fields)

    def create_guest_user(self):
        max_digits_id = 4
        guest_id = self.__generate_guest_id(max_digits_id)

        username = "guest{0:04}".format(guest_id)
        email = "guest{0:04}@guest.com".format(guest_id)
        password = "pass{0:04}".format(guest_id)

        other_fields = dict()
        other_fields.setdefault('is_active', False)
        other_fields.setdefault('is_guest', True)

        return self.create_user(username, email, password, **other_fields)

    def __generate_guest_id(self, max_no_digits):
        lower_bound = 0
        upper_bound = 10 ** max_no_digits

        while True:
            guest_id = random.randrange(lower_bound, upper_bound)
            generated_username = "guest{0:04}".format(guest_id)
            generated_email = "guest{0:04}@guest.com".format(guest_id)

            users_with_same_data = NewUser.objects.filter(Q(username=generated_username) | Q(email=generated_email))

            if len(users_with_same_data) == 0:
                return guest_id


    def create_user(self, username, email, password, **other_fields):
        if not username:
            raise ValueError('You must provide a username.')
        if not email:
            raise ValueError('You must provide an email address.')

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **other_fields)
        user.set_password(raw_password=password)
        user.save()
        
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150, default="", blank=True)
    last_name = models.CharField(max_length=150, default="", blank=True)
    birthday = models.DateField(blank=True, null=True)
    about_me = models.TextField(max_length=500, default="", blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_guest = models.BooleanField(default=False)

    current_debate = models.ForeignKey(to=Debate, on_delete=models.PROTECT, blank=True, null=True)
    role = models.CharField(max_length=50, blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', ]

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "User"
