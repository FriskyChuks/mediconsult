from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import *
from rest_framework.generics import *

from .models import CustomUser as User, UserStatus
from .serializers import CustomUserSerializer, UserStatusSerializer
from clinicians.serializers import ApplicationRequestSerializer
from clinicians.models import ApplicationRequest


@api_view(['GET'])
@permission_classes([AllowAny])
def get_user(request, email, phone):
    user = User.objects.filter(Q(email=email) | Q(phone=phone))
    serializer = CustomUserSerializer(user, many=True)
    data = serializer.data

    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def set_user_online(request, email):
    user = User.objects.get(email=email)
    UserStatus.objects.update_or_create(
        user=user, defaults={'is_online': True, 'last_active': timezone.now()})

    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def set_user_offline(request, email):
    user = User.objects.get(email=email)
    UserStatus.objects.filter(user=user).update(is_online=False)

    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_users_view(request):
    users = User.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    data = serializer.data

    return Response(data, status=status.HTTP_200_OK)


class UpdateActivityView(APIView):
    # permission_classes = [AllowAny]

    def post(self, request):
        UserStatus.objects.filter(user=request.user).update(
            last_active=timezone.now(), is_online=True)
        return Response({"status": "success"}, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_online_clinicians(request):
    user_list = []
    users = User.objects.filter(is_clinician=True)
    for user in users:
        user_list.append(user.id)
    online_users = UserStatus.objects.filter(
        is_online=True, user_id__in=user_list)
    online_users_list = [online_user.user.id for online_user in online_users]
    queryset = ApplicationRequest.objects.filter(
        applicant_id__in=online_users_list)
    serializer = ApplicationRequestSerializer(queryset, many=True)
    data = serializer.data
    return Response(data, status=status.HTTP_200_OK)
