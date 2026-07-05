from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path(
        'manage/',
        admin.site.urls
    ),
    path(
        'api/v1/core/',
        include('core.api.urls')
    ),
]
