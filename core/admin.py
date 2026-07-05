# DJANGO IMPORTS
from django.contrib import admin

# LOCAL IMPORTS
from .models import User, Profile


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'email',
        'first_name',
        'last_name',
        'is_active',
        'is_staff',
        'is_superuser'
    )
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('id',)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'name',
        'fathers_name',
    )
    search_fields = ('user__email', 'user__first_name', 'user__last_name')
    ordering = ('id',)
