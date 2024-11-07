from rest_framework import status
from rest_framework.generics import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import *

from .serializers import *


class OrdersListView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_orders_view(request):
    customer_id = request.data.get("customer_id")
    discount = request.data.get("discount")
    VAT = request.data.get("VAT")
    print(VAT)
    instance = Order(customer_id=customer_id, discount=discount, VAT=VAT)
    instance.save()
    # Return the ID and other necessary data as JSON response
    return Response({"id": instance.id, "customer_id": instance.customer_id})


class OrdersRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class OrderDetailCreateView(CreateAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer
    permission_classes = [AllowAny]


class OrderDetailRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_details_views(request, order_id):
    order = Order.objects.filter(id=order_id)
    if not order:
        return Response({"message": "This order does not exist!"}, status=status.HTTP_404_NOT_FOUND)
    queryset = OrderDetail.objects.filter(order_id=order_id)
    serializer = OrderDetailSerializer(queryset, many=True)
    data = serializer.data
    return Response(data, status=status.HTTP_200_OK)


class DeliveryView(ListCreateAPIView):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer
    permission_classes = (IsAuthenticated,)
