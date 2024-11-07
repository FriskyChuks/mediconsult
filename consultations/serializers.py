from rest_framework import serializers

from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    # timestamp = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S.%fZ')

    class Meta:
        model = Message
        fields = '__all__'
