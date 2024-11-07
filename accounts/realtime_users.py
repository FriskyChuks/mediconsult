from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta

from .models import CustomUser


def get_online_users():
    now = timezone.now()
    time_threshold = now - timedelta(minutes=5)
    return CustomUser.objects.filter(last_activity__gte=time_threshold)
