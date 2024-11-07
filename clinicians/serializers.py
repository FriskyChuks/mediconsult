from rest_framework import serializers

from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']


class ApplicationRequestSerializer(serializers.ModelSerializer):
    applicant_info = serializers.SerializerMethodField(read_only=True)
    category_info = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = ApplicationRequest
        fields = '__all__'

    def get_applicant_info(self, obj):
        return {
            'name': f'{obj.applicant.firstname} {obj.applicant.lastname}',
            'email': obj.applicant.email
        }

    def get_category_info(self, obj):
        return obj.category.title
