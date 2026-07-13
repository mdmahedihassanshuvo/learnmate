from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

from core.api.views import (
    CurrentUserAPIView,
    LoginAPIView,
    LogoutAPIView,
    SignupAPIView
)

urlpatterns = [
    path(
        'signup/',
        SignupAPIView.as_view(),
        name='signup'
    ),
    path(
        'login/',
        LoginAPIView.as_view(),
        name='login'
    ),
    path(
        'logout/',
        LogoutAPIView.as_view(),
        name='logout'
    ),
    path(
        'token/refresh/',
        TokenRefreshView.as_view(),
        name='token-refresh'
    ),
    path(
        'token/verify/',
        TokenVerifyView.as_view(),
        name='token-verify'
    ),
    path(
        'me/',
        CurrentUserAPIView.as_view(),
        name='current-user'
    ),
]
