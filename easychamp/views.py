import json

import jwt
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
# Create your views here.
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from eesswtmc import settings
from .models import EasyChampUser, Sport, Clubs
from .serializers import EasyUserSerializer, UsersSerializer, SportsSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'authToken': str(refresh.access_token),
    }


def set_tokens(request, user, response):
    data = get_tokens_for_user(user)
    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE'],
        value=data["authToken"],
        expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
    )
    response.data = {"isSuccessful": True}

    return data


def get_emails():
    emails = []
    for user in User.objects.all():
        emails.append(user.email)
    return emails


class Register(APIView):

    def post(self, request, *args, **kwargs):
        body = json.loads(request.body)
        response = Response()
        if body['email'] in get_emails():
            return Response({"detail": "User with this email exist"}, status=400)
        if body['password1'] != body['password2']:
            return Response({"detail": "Passwords are not the same"}, status=400)
        user = User(
            first_name=body['first_name'],
            last_name=body['last_name'],
            email=body['email'],
            username=body['email'],
            password=make_password(body['password1'])
        )

        user.save()
        user = authenticate(username=body['email'], password=body['password1'])
        print(user)
        if user is not None:
            if user.is_active:
                tokens = set_tokens(request, user, response)
                response.data = {"success": True, "token": tokens["authToken"]}
                print(response.cookies)
                return response
        else:
            return Response({"detail": "Cannot login"}, status=401)


def get_user_from_token(request):
    token = request.COOKIES.get('authToken', None)
    if not token:
        return None
    decoded = jwt.decode(token, settings.SIMPLE_JWT["SIGNING_KEY"], settings.SIMPLE_JWT["ALGORITHM"])
    user = User.objects.get(pk=decoded["user_id"])
    return user


class PickRole(APIView):
    def get(self, request, *args, **kwargs):
        roles = {}
        print(request.COOKIES)
        for role in EasyChampUser.ROLES[:-1]:
            roles[role[0]] = role[1]
        return Response(roles)

    def post(self, request, *args, **kwargs):
        body = json.loads(request.body)
        response = Response()
        user = get_user_from_token(request)
        if not user:
            return Response({"detail": "No user"}, status=status.HTTP_404_NOT_FOUND)
        euser = EasyChampUser(user=user, role=body['role'])
        euser.save()
        response.data = {"success": True, "role": body['role']}
        return response


class Login(APIView):
    # authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, *args, **kwargs):
        body = json.loads(request.body)
        response = Response()
        if body['email'] == "" or body['password'] == "":
            return Response({"detail": "Введіть будь ласка email і пароль."}, status=400)

        user = authenticate(username=body['email'], password=body['password'])
        if user is not None:
            if user.is_active:
                tokens = set_tokens(request, user, response)
                response.data = {"success": True, "token": tokens["authToken"]}
                print(response.data)
                print(response.cookies)
                return response
            else:
                return Response({"No active": "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"Invalid": "Invalid username or password!!"}, status=status.HTTP_400_BAD_REQUEST)


def get_user_role(user):
    for role in EasyChampUser.ROLES:
        if role[0] == user.role:
            return role[1]


class Private(APIView):

    def get(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        if not user:
            return Response({"detail": "No user"}, status=status.HTTP_404_NOT_FOUND)
        response = Response()
        euser = EasyChampUser.objects.get(user=user)
        role = get_user_role(euser)
        response.data = {
            "data": {
                "id": user.id,
                "role": role,
                "username": user.username,
                "email": user.email
            }

        }
        request.user = response.data
        return response


class EasyUsersView(viewsets.ModelViewSet):
    serializer_class = EasyUserSerializer
    queryset = EasyChampUser.objects.all()


class UsersView(viewsets.ModelViewSet):
    serializer_class = UsersSerializer
    queryset = User.objects.all()


class SportView(viewsets.ModelViewSet):
    serializer_class = SportsSerializer
    queryset = Sport.objects.all()

    def create(self, request, *args, **kwargs):
        return Response(json.loads(request.body))


class CreateClub(APIView):
    def post(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        if not user:
            return Response({"detail": "No user"}, status=status.HTTP_404_NOT_FOUND)
        body = json.loads(request.body)
        response = Response()
        sport = Sport.objects.get(nameId=body['sport'])
        club = Clubs(name=body['name'], sport=sport)
        club.save()
        euser = EasyChampUser.objects.get(user=user)
        euser.club = club
        euser.save()
        response.data = {
            "club": club.name
        }
        return response


class PickClub(APIView):
    def get(self, request, *args, **kwargs):
        sport_name = request.GET['sport']
        print(sport_name)
        sport = Sport.objects.get(nameId=sport_name)
        queryset = Clubs.objects.filter(sport=sport)
        clubs = []
        for club in queryset:
            clubs.append(
                {
                    "id": club.id,
                    "name": club.name
                }
            )
        return Response(clubs)

    def post(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        if not user:
            return Response({"detail": "No user"}, status=status.HTTP_404_NOT_FOUND)
        body = json.loads(request.body)
        response = Response()
        club = Clubs.objects.get(pk=body['id'])
        euser = EasyChampUser.objects.get(user=user)
        euser.club = club
        euser.save()
        response.data = {
            "club": club.name
        }
        return response
