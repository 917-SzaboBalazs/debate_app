from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import NewUser


class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('username', 'first_name', 'last_name', )
    list_filter = ('is_active', 'is_staff', )
    list_display = ('username', 'get_name', 'is_active', 'is_staff')

    fieldsets = (
        ('Login info', {'fields': ('username', 'email', 'password', )}),
        ('Permissions', {'fields': ('is_superuser', 'is_active', 'is_staff', )}),
        ('Personal', {'fields': ('first_name', 'last_name', 'birthday', 'about_me', )}),
        ('Other', {'fields': ('start_date', )}),
    )

    @admin.display(
        description='fullname',
        ordering='first_name',
        )
    def get_name(self, obj):

        return obj.first_name + " " + obj.last_name


admin.site.register(NewUser, UserAdminConfig)

