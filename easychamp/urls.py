from django.urls import path, include
from rest_framework import routers

from easychamp.views import UsersView, EasyUsersView, Login, Private

router = routers.DefaultRouter()
router.register(r'users', EasyUsersView, 'users')
router.register(r'full_users', UsersView, 'full_users')
router.register(r'sports', UsersView, 'sport')
router.register(r'clubs', UsersView, 'clubs')

urlpatterns = [
    # path('auth/auth/register', Register.as_view(), name='register'),
    path('api/', include(router.urls)),
    path('api/auth/login', Login.as_view(), name='login'),
    path('api/private', Private.as_view())
]
