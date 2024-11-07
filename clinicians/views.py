from rest_framework.generics import *
from rest_framework.permissions import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *


class CategoryListCreateView(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class ApplicationListCreateView(ListCreateAPIView):
    queryset = ApplicationRequest.objects.all()
    serializer_class = ApplicationRequestSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
@permission_classes([AllowAny])
def get_pending_application(request, applicant_id):
    app = ApplicationRequest.objects.filter(
        applicant_id=applicant_id, status='pending')
    serializer = ApplicationRequestSerializer(app, many=True)
    return Response(serializer.data)


class ApplicationDetailView(RetrieveAPIView):
    queryset = ApplicationRequest.objects.all()
    serializer_class = ApplicationRequestSerializer
    permission_classes = [IsAuthenticated]


@api_view(['PATCH'])
@permission_classes([AllowAny])
def approve_application_view(request, id):
    user = ''
    apps = ApplicationRequest.objects.filter(id=id)
    for app in apps:
        user = User.objects.filter(id=app.applicant.id)
    print('pending')
    user.update(is_clinician=True)
    print('success')
    apps.update(status='approved')
    return Response({"message": "Approved successfully"}, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([AllowAny])
def decline_application_view(request, id):
    app = ApplicationRequest.objects.filter(id=id)
    app.update(status='declined')
    return Response({"message": "Declined successfully"}, status=status.HTTP_200_OK)
