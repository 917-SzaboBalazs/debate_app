from django.urls import path

from motion.views import ListMotionsView, RandomMotionView

app_name = "motion"
urlpatterns = [
    path('', ListMotionsView.as_view(), name="list_motions"),
    path('random/', RandomMotionView.as_view(), name="random_motion"),
]