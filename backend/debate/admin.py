from django.contrib import admin
from debate.models import Debate, Participant

# Register your models here.

admin.site.register(Participant)
admin.site.register(Debate)
