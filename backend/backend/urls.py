
# django-react-docker/backend/backend/urls.py
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('test/', views.send_some_data), # Add this
    path("", views.index, name="index"),
]
