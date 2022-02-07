import json

from django.contrib.auth import authenticate
from django.shortcuts import redirect
from rest_framework import viewsets, status, authentication
from django.contrib.auth.models import User
# Create your views here.
from django.views import View
from rest_framework import viewsets, status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_jwt.views import verify_jwt_token
from eesswtmc import settings
from .forms import UserCreateForm
from .models import EasyChampUser
from .serializers import EasyUserSerializer, UsersSerializer
import jwt


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


# class Register(View):
#     template_name = "registration/register.html"
#
#     def get(self, request, *args, **kwargs):
#         form = UserCreateForm()
#         return render(request, self.template_name, {'form': form})
#
#     def post(self, request, *args, **kwargs):
#         form = UserCreateForm(request.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             raw_password = form.cleaned_data.get('password1')
#             user = authenticate(email=email, password=raw_password)
#             login(request, user)
#             return redirect('profile')

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


class Private(APIView):

    def get(self, request, *args, **kwargs):
        token = None
        if request.headers["authorization"] and "Bearer" in request.headers["authorization"]:
            token = request.headers["authorization"].split()[1]
        if not token:
            return Response({"detail": "Ви не маєте доступу по цьому маршруту"}, status=status.HTTP_401_UNAUTHORIZED)
        decoded = jwt.decode(token, settings.SIMPLE_JWT["SIGNING_KEY"], settings.SIMPLE_JWT["ALGORITHM"])
        user = User.objects.get(pk=decoded["user_id"])
        if not user:
            return Response({"detail": "No user"}, status=status.HTTP_404_NOT_FOUND)
        response = Response()
        euser = EasyChampUser.objects.get(user=user)
        response.data = {
            "data": {
                "id": user.id,
                "role": euser.role,
                "usename": user.username,
                "email": user.last_name
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
