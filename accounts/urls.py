from django.urls import path

from .views import *


urlpatterns = [
    path('get_user/<email>/<phone>/', get_user),
    path('get_all_users/', get_all_users_view, name='get_all_users'),
    path('online_clinicians/', get_online_clinicians),
    path('update_activity/', UpdateActivityView.as_view()),
    path('set_user_online/<email>/', set_user_online),
    path('set_user_offline/<email>/', set_user_offline),
]
