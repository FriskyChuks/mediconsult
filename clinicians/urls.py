from django.urls import path

from .views import *

urlpatterns = [
    path('category/', CategoryListCreateView.as_view()),
    path('apply/', ApplicationListCreateView.as_view()),
    path('application_detail/<pk>/', ApplicationDetailView.as_view()),
    path('approve_application/<id>/',
         approve_application_view, name='approve_application'),
    path('decline_application/<id>/',
         decline_application_view, name='approve_application'),
    path('get_pending_application/<applicant_id>/', get_pending_application),

]
