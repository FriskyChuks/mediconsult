from rest_framework import serializers
from rest_framework.validators import ValidationError
from rest_framework.authtoken.models import Token
import re
from djoser.serializers import UserCreateSerializer
from djoser.serializers import UserSerializer
from django.contrib.auth import authenticate

from .models import *

from django.contrib.auth import get_user_model
User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'firstname', 'lastname', 'password']


class CustomUserSerializer(UserSerializer):
    user_group = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'firstname',
                  'lastname', 'phone', 'user_group', 'is_active']

    def get_user_group(self, obj):
        return obj.user_group.title


class UserStatusSerializer(serializers.ModelSerializer):
    user_email = serializers.SerializerMethodField(read_only=True)
    fullname = serializers.SerializerMethodField(read_only=True)
    user_id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserStatus
        fields = '__all__'

    def get_user_email(self, obj):
        return obj.user.email

    def get_fullname(self, obj):
        return f"{obj.user.firstname} {obj.user.lastname}"

    def get_user_id(self, obj):
        return obj.user.id
