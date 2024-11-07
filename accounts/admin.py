from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from .models import *


class UserAdminConfig(UserAdmin):
    model = CustomUser
    search_fields = ('email', 'firstname', 'lastname', 'phone', 'user_group')
    list_filter = ('email', 'firstname', 'lastname', 'phone', 'is_active',
                   'is_staff', 'is_customer', 'is_clinician', 'user_group')
    list_display = ('email', 'firstname', 'lastname', 'phone', 'is_active',
                    'user_group', 'is_customer', 'is_clinician', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'firstname',
         'lastname',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'user_group')}),
        # ('Personal')
    )
    ordering = ('email',)


admin.site.register(CustomUser, UserAdminConfig)
admin.site.register(UserStatus)
admin.site.register(UserGroup)
