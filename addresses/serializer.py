from rest_framework import serializers

from .models import LGA, State, Country, Address


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['id', 'title']


class LGASerializer(serializers.ModelSerializer):
    state = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = LGA
        fields = ['id', 'title', 'state']

    def get_state(self, obj):
        return obj.state.title


class AddressSerializer(serializers.ModelSerializer):
    customer_address = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Address
        fields = '__all__'  # ['id', 'title']

    def get_customer_address(self, obj):
        return {
            'state': obj.state.title,
            'lga': obj.lga.title,
        }
