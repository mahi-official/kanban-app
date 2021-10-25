from django.urls.conf import include
from django.urls import path
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'', views.BoardViewSet, basename='Board')

urlpatterns = [
    path('', include(router.urls)),
]