from django.urls import path

from .views import *


urlpatterns = [
    path('', OrdersListView.as_view()),
    path('create_order/', create_orders_view),
    path('update_delete_order/<pk>/', OrdersRetrieveUpdateDeleteView.as_view()),
    path('update_delete_order_detail/<pk>/',
         OrderDetailRetrieveUpdateDeleteView.as_view()),
    path('create_order_detail/', OrderDetailCreateView.as_view()),
    path('order_details/<order_id>/',
         order_details_views, name='order_details'),
    path('delivery/', DeliveryView.as_view()),
]
