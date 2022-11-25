from django.contrib import admin
from .models import *


@admin.register(UserSetup)
class UserSetupAdmin(admin.ModelAdmin):
    list_display = ['user', 'menu_suite', 'mrp_jnl_batch']


@admin.register(MenuSuite)
class MenuSuiteAdmin(admin.ModelAdmin):
    list_display = ['code']


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ['no', 'key', 'title', 'label',
                    'danger', 'disabled', 'type', 'icon']


@admin.register(SubMenu)
class SubMenuAdmin(admin.ModelAdmin):
    list_display = ['no', 'key', 'title', 'label',
                    'danger', 'disabled', 'type', 'icon']


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['nick_name', 'initial', 'section',
                    'position', 'phone_no', 'ext_no']
