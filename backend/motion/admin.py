from django.contrib import admin

# Register your models here.
from motion.models import Motion


@admin.register(Motion)
class MotionAdminConfig(admin.ModelAdmin):
    model = Motion
    list_display = ('id', 'text_in_hungarian', 'text_in_english', 'is_available', )
    fields = ('text_in_hungarian', 'text_in_english', )

    def is_available(self, obj: Motion):
        return self.model.objects.is_available(obj)
