from django.contrib import admin
from blog.models import BlogPost

@admin.register(BlogPost)
class DebateAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_created', 'status', )
    fields = ('title', 'slug', 'thumbnail', 'excerpt', 'content', 'date_created', 'status', )
    readonly_fields = ('slug', 'excerpt', )
    search_fields = ('title', )
