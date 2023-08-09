from django.contrib import admin
from debate.models import Debate


class IsMotionIsNullFilter(admin.SimpleListFilter):

    title = 'motion'
    parameter_name = 'motion'

    def lookups(self, request, model_admin):
        return (
            ('empty', 'Empty motions'),
            ('non-empty', 'Non-empty motions'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'empty':
            return queryset.filter(motion__isnull=True)

        if self.value() == 'non-empty':
            return queryset.filter(motion__isnull=False)


@admin.register(Debate)
class DebateAdmin(admin.ModelAdmin):
    list_display = ('id', 'motion', 'type', 'entry_code', 'result', 'status', 'date_time', )
    fieldsets = (
        ('Debate Info', {'fields': ('motion', 'type', 'entry_code', 'result', 'status', 'date_time',)}),
    )
    readonly_fields = ('motion', 'type', 'entry_code', 'result', 'status', 'date_time', )
    list_filter = (IsMotionIsNullFilter, 'type', 'status', 'result', )
    search_fields = ('motion', )

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False

