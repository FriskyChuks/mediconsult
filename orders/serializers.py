from rest_framework import serializers

from .models import *


class OrderSerializer(serializers.ModelSerializer):
    customer_info = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_customer_info(self, obj):
        return {
            "email": obj.customer.email,
            "name": f"{obj.customer.firstname} {obj.customer.lastname}",
        }


class OrderDetailSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField(read_only=True)
    order_date = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderDetail
        fields = '__all__'

    def get_order_date(self, obj):
        return obj.order.order_date

    def get_customer(self, obj):
        return obj.order.customer.email


class DeliverySerializer(serializers.ModelSerializer):
    staff = serializers.SerializerMethodField(read_only=True)
    delivery_mode = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Delivery
        fields = '__all__'

    def get_staff(self, obj):
        return obj.confirmed_by.fullname

    def get_delivery_mode(self, obj):
        return obj.mode.title


class ModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMode
        fields = '__all__'


# class CartSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cart
#         fields = '__all__'
