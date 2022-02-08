from django.urls import path, include
from rest_framework import routers

from easychamp.views import UsersView, EasyUsersView, Login, Private, Register, PickRole, SportView, CreateClub, \
    PickClub

router = routers.DefaultRouter()
router.register(r'users', EasyUsersView, 'users')
router.register(r'full_users', UsersView, 'full_users')
router.register('sports', SportView, 'sport')
router.register(r'clubs', UsersView, 'clubs')

urlpatterns = [
    path('api/auth/register', Register.as_view(), name='register'),
    path('api/', include(router.urls)),
    path('api/auth/login', Login.as_view(), name='login'),
    path('api/private', Private.as_view()),
    path('api/roles', PickRole.as_view()),
    path('api/create-club', CreateClub.as_view()),
    path('api/pick-club', PickClub.as_view())
]
