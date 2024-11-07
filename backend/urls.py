from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path
from django.views.generic import TemplateView

from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', index, name='index'),
    path('orders/', include('orders.urls')),
    path('clinicians/', include('clinicians.urls')),
    path('address/', include('addresses.urls')),
    path('consultations/', include('consultations.urls')),
    path('prescriptions/', include('prescriptions.urls')),

    path('accounts/', include('accounts.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls.authtoken')),

    # Catch-all route to serve the React app
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
