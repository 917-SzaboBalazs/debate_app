from django.urls import path

from .views import ListCreateBlogPostView, RetrieveBlogPostView

app_name = "blog"

urlpatterns = [
    path('', ListCreateBlogPostView.as_view(), name='list_create_blog_post'),
    path('<slug>/', RetrieveBlogPostView.as_view(), name='retrieve_blog_post'),
]
