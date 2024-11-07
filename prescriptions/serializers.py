from rest_framework import serializers

from .models import *


class PrescriptionSerializer(serializers.ModelSerializer):
    customer_info = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Prescription
        fields = ['id', 'customer', 'customer_info', 'date']

    def get_customer_info(self, obj):
        return {
            'id': obj.customer.id,
            'fullname': f"{obj.customer.firstname} {obj.customer.lastname}",
            'email': obj.customer.email,
            'phone': obj.customer.phone
        }


class PrescriptionDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = PrescriptionDetail
        fields = ['prescription', 'item', 'dose']

    # def get_customer_info(self, obj):
    #     return {
    #         'id': obj.customer.id,
    #         'fullname': f"{obj.customer.firstname} {obj.customer.lastname}",
    #         'email': obj.customer.email,
    #         'phone': obj.customer.phone
    #     }
