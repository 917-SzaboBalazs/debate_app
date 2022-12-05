from django.contrib import admin

# Register your models here.
from motion.models import Motion


class IsAvailableFilter(admin.SimpleListFilter):
    title = "is available"
    parameter_name = "is_available"

    def lookups(self, request, model_admin):
        return (
            ('1', 'Yes'),
            ('0', 'No'),
        )

    def queryset(self, request, queryset):
        if self.value() == "1":
            motions = [motion.id for motion in queryset if Motion.objects.is_available(motion)]

        elif self.value() == "0":
            motions = [motion.id for motion in queryset if not Motion.objects.is_available(motion)]

        else:
            motions = [motion.id for motion in queryset]

        return queryset.filter(id__in=motions)


@admin.register(Motion)
class MotionAdminConfig(admin.ModelAdmin):
    model = Motion
    list_display = ('id', 'text_in_hungarian', 'text_in_english', 'is_available', )
    fields = ('text_in_hungarian', 'text_in_english', )
    list_filter = (IsAvailableFilter, )
    search_fields = ('text_in_hungarian', 'text_in_english', )

    @admin.display(boolean=True)
    def is_available(self, obj: Motion):
        return self.model.objects.is_available(obj)
