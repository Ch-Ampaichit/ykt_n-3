from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register('items', views.ItemViewSet)

urlpatterns = [
    path('api/send_email/', views.send_email),
]
