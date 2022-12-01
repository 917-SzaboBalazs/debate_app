from django.contrib import admin
from debate.models import Debate


@admin.register(Debate)
class DebateAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'entry_code', 'result', 'status', 'date_time', )
    fieldsets = (
        ('Debate Info', {'fields': ('type', 'entry_code', 'motion', 'status', 'date_time', 'result', 'current_number', )}),
        ('Custom options', {'fields': ('speaker_time', )}),
    )
