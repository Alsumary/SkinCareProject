from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('booking/<int:treat_id>', views.booking, name='booking'),
    path('treatment', views.treatment, name='treatment'),
]