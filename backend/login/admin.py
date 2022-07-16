from django.contrib import admin

# Register your models here.
from django.contrib.admin import display

from login.models import User


class UserAdmin(admin.ModelAdmin):

    list_display = ('username', 'get_name', 'email', 'birthday')

    @display(description='fullname', ordering='firstname')
    def get_name(self, obj):
        return obj.firstname + " " + obj.lastname


admin.site.register(User, UserAdmin)
