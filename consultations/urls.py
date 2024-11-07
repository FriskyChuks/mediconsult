from django.urls import path

from .views import *

urlpatterns = [
    path('', MessageCreateView.as_view()),
    path('get_receiver/<sender>/<receiver>/', get_receiver_view),
]
