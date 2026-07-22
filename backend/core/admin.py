from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

# LOCAL IMPORTS
from .models import (
    User,
    Profile,
    SiteConfig,
    Menu,
    MenuSection,
    StatisticalDashboard
)


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone')}),
        (
            'Permissions',
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'groups',
                    'user_permissions',
                )
            }
        ),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': ('username', 'email', 'phone', 'password1', 'password2'),
            },
        ),
    )
    list_display = (
        'id',
        'username',
        'email',
        'first_name',
        'last_name',
        'is_active',
        'is_staff',
        'is_superuser'
    )
    list_filter = ('is_active', 'is_staff', 'is_superuser', 'groups')
    search_fields = ('username', 'email', 'first_name', 'last_name')
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


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
    )
    ordering = ('id',)


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'code',
        'name_en',
        'name_bn',
        'site',
    )
    search_fields = ('code', 'name_en', 'name_bn')
    ordering = ('id',)


@admin.register(MenuSection)
class MenuSectionAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'menu',
        'order',
        'name',
        'name_bn',
    )
    search_fields = ('menu__code', 'name', 'name_bn')
    ordering = ('id',)


@admin.register(StatisticalDashboard)
class StatisticalDashboardAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'site',
        'title_en',
        'title_bn',
        'div_id',
        'widget_type',
    )
    search_fields = (
        'site__name',
        'title_en',
        'title_bn',
        'div_id'
    )
    ordering = ('id',)
