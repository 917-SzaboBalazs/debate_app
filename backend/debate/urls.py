from django.urls import path

from debate.views import CreateDebateView, RetrieveUpdateCurrentDebateView

app_name = "debate"

urlpatterns = [
    path('create/', CreateDebateView.as_view(), name='create_debate'),
    path('current/', RetrieveUpdateCurrentDebateView.as_view(), name='current_debate'),
]
