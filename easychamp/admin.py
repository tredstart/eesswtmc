from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.
from django.contrib.auth.models import User

from easychamp.models import EasyChampUser


class UserInline(admin.StackedInline):
    model = EasyChampUser
    can_delete = False
    verbose_name_plural = "users"


class EasyUser(BaseUserAdmin):
    inlines = (UserInline,)


admin.site.unregister(User)
admin.site.register(User, EasyUser)
