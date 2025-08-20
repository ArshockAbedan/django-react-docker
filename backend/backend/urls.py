
# django-react-docker/backend/backend/urls.py
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('test/', views.send_some_data),
    path('', views.index, name='index'),
    path('api/login/', views.login_view, name='login'),
    path('api/register/', views.register_view, name='register'),
    path('api/google-login/', views.google_login_view, name='google-login'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
]
