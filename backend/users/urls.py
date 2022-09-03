from django.urls import path
from users.views import CustomUserCreate, BlacklistTokenUpdateView, CurrentUserView, GetDebaterByRoleView, \
    GetDebaterByCurrentNumberView, GetAllDebatersFromCurrentDebateView

app_name = 'users'
urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('current/', CurrentUserView.as_view(), name="current_user"),
    path('all-from-current-debate/', GetAllDebatersFromCurrentDebateView.as_view(), name="all_from_current"),
    path('role/', GetDebaterByRoleView.as_view(), name="debater_by_role"),
    path('number/', GetDebaterByCurrentNumberView.as_view(), name="debater_by_number"),
]

