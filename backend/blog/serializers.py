from rest_framework import serializers
from blog.models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    added_by = serializers.StringRelatedField(default=serializers.CurrentUserDefault(), read_only=True)

    class Meta:
        model = BlogPost
        fields = ['title', 'slug', 'added_by', 'thumbnail', 'excerpt', 'content', 'date_created', ]
        