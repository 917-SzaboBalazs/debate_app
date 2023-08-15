from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from blog.models import BlogPost

@admin.register(BlogPost)
class DebateAdmin(SummernoteModelAdmin):
    list_display = ('title', 'added_by', 'date_created', 'status', )
    fields = ('title', 'slug', 'added_by', 'thumbnail', 'excerpt', 'content', 'date_created', 'status', )
    readonly_fields = ('added_by', 'slug', 'excerpt', )
    search_fields = ('title', )
    summernote_fields = ('content', )
