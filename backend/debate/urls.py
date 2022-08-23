from django.urls import path

from debate.views import CurrentDebateView, CreateDebateView, DebateCodeView

app_name = "debate"

urlpatterns = [
    path('', CreateDebateView.as_view(), name='create_debate'),
    path('current/', CurrentDebateView.as_view(), name='current_debate'),
    path('entry-code/', DebateCodeView.as_view(), name='debate_code'),
]
