from rest_framework import serializers

from .models import *


class EasyUserSerializer(serializers.Serializer):
    id = serializers.IntegerField(source="user.id")
    username = serializers.CharField(source="user.username")
    password = serializers.CharField(source='user.password')
    firstName = serializers.CharField(source='user.first_name')
    lastName = serializers.CharField(source='user.last_name')
    role = serializers.CharField()


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password')


class SportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = '__all__'


class ClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = '__all__'