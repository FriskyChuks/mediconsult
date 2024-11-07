from django.urls import path

from .views import *


urlpatterns = [
    path('states/', StateListView.as_view()),
    path('lga/', LGAListView.as_view()),
    path('', AddressListCreateView.as_view()),
    path('get_customer_address/<customer_id>/', get_customer_address),
]
