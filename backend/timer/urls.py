from django.urls import path

from timer.views import CurrentTimeView, CreatePOITimerView

app_name = "timer"

urlpatterns = [
    path('', CurrentTimeView.as_view(), name="current_time"),
    path('poi/', CreatePOITimerView.as_view(), name="poi_time",)
]
