from django.urls import path

from timer.views import CurrentTimeView

app_name = "timer"

urlpatterns = [
    path('', CurrentTimeView.as_view(), name="current_time"),
]
