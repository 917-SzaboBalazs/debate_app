from django.contrib import admin
from debate.models import Debate


@admin.register(Debate)
class DebateAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'entry_code', 'winner', 'status', 'date_time', )
    fieldsets = (
        ('Debate Info', {'fields': ('type', 'entry_code', 'motion', 'status', 'date_time', 'winner', 'current_number', )}),
        ('Custom options', {'fields': ('team_size', 'no_judges', 'has_chair', )}),
    )
