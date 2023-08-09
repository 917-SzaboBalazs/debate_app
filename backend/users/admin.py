from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

from users.models import NewUser


@admin.register(NewUser)
class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('username', 'first_name', 'last_name', )
    list_filter = ('is_active', 'is_staff', 'is_guest', )
    list_display = ('username', 'get_name', 'is_active', 'is_staff', 'is_guest', )
    readonly_fields = ('current_debate', 'role', 'start_date', )
    actions = ('make_active', 'make_inactive', )

    fieldsets = (
        ('Login info', {'fields': ('username', 'email', 'password', )}),
        ('Permissions', {'fields': ('is_superuser', 'is_active', 'is_staff', 'is_guest', )}),
        ('Personal', {'fields': ('first_name', 'last_name', 'birthday', 'about_me', )}),
        ('Debate', {'fields': ('current_debate', 'role', )}),
        ('Other', {'fields': ('start_date', )}),
    )

    @admin.display(description='fullname', ordering='first_name')
    def get_name(self, obj):
        return obj.first_name + " " + obj.last_name

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        return False

    @admin.action(description='Deactivate selected users')
    def make_inactive(self, request, queryset):
        if request.user in queryset:
            messages.error(request, "You can't deactivate yourself")
            queryset = queryset.exclude(id=request.user.id)

        queryset.update(is_active=False)

    @admin.action(description="Activate selected users")
    def make_active(self, request, queryset):
        queryset.update(is_active=True)


admin.site.unregister(Group)
admin.site.unregister(BlacklistedToken)
admin.site.unregister(OutstandingToken)
