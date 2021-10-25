from django.urls.conf import include
from django.urls import path
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'', views.OrderViewSet, basename='Order')

urlpatterns = [
    path('', include(router.urls)),
]