from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import NewUser


@admin.register(NewUser)
class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('username', 'first_name', 'last_name', )
    list_filter = ('is_active', 'is_staff', 'is_guest', )
    list_display = ('username', 'get_name', 'is_active', 'is_staff', 'is_guest', )

    fieldsets = (
        ('Login info', {'fields': ('username', 'email', 'password', )}),
        ('Permissions', {'fields': ('is_superuser', 'is_active', 'is_staff', 'is_guest', )}),
        ('Personal', {'fields': ('first_name', 'last_name', 'birthday', 'about_me', )}),
        ('Debate', {'fields': ('current_debate', 'role', 'number', )}),
        ('Other', {'fields': ('start_date', )}),
    )

    @admin.display(description='fullname', ordering='first_name')
    def get_name(self, obj):
        return obj.first_name + " " + obj.last_name
