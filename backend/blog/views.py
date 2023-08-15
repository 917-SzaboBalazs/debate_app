from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from blog.serializers import BlogPostSerializer
from blog.models import BlogPost

# Create your views here.
class ListCreateBlogPostView(ListCreateAPIView):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.filter(status__iexact=1)

class RetrieveBlogPostView(RetrieveAPIView):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.filter(status__iexact=1)
    lookup_field = 'slug'