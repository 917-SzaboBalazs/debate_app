from django.urls import path

from motion.views import ListMotionsView, RandomMotionView, MotionDeeplTranslateView

app_name = "motion"
urlpatterns = [
    path('', ListMotionsView.as_view(), name="list_motions"),
    path('random/', RandomMotionView.as_view(), name="random_motion"),
    path('translate/', MotionDeeplTranslateView.as_view(), name="motion_deepl_translate"),
]