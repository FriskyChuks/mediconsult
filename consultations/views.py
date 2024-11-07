from django.shortcuts import render
from rest_framework.generics import *
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import *
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q

from .serializers import MessageSerializer
from .models import Message


class MessageCreateView(CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_receiver_view(request, sender, receiver):
    chat_members = Message.objects.filter(
        Q(sender_id=sender, receiver_id=receiver) | Q(sender_id=receiver, receiver_id=sender))
    serializer = MessageSerializer(chat_members, many=True)
    data = serializer.data

    return Response(data, status=status.HTTP_200_OK)
