from django.urls import path

from core.api.views.user import UserCreateAPIView

urlpatterns = [
    path('users/', UserCreateAPIView.as_view(), name='user-create'),
]
