from django.urls import path
from users.views import RetrieveUserView, ListCreateUsersView, BlacklistTokenUpdateView

app_name = 'users'
urlpatterns = [
    path('', ListCreateUsersView.as_view(), name="list_users"),
    path('<int:pk>/', RetrieveUserView.as_view(), name="retrieve_user"),
    path('current/', RetrieveUserView.as_view(), name="current_user"),

    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
]

