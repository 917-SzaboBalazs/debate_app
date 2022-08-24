from django.urls import path

from debate.views import CurrentDebateView, CreateDebateView

app_name = "debate"

urlpatterns = [
    path('', CreateDebateView.as_view(), name='create_debate'),
    path('current/', CurrentDebateView.as_view(), name='current_debate'),
]
