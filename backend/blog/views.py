from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from blog.serializers import BlogPostSerializer
from blog.models import BlogPost
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class ListCreateBlogPostView(ListCreateAPIView):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.filter(status__iexact="published")
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(added_by=request.user)

    

class RetrieveBlogPostView(RetrieveAPIView):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.filter(status__iexact="published")
    lookup_field = 'slug'
