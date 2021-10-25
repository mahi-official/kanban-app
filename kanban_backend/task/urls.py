from django.urls.conf import include
from django.urls import path
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'', views.TaskViewSet, basename='Task')

# urlpatterns = [
#     path('', include(router.urls)),
# ]

urlpatterns = [
    path('', views.TaskListView.as_view(), name='TaskList'),
    path('<pk>/', views.TaskDetailView.as_view(), name='TaskDetail'),
]
