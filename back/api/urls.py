from django.urls import path
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from api.views import all_cities


urlpatterns = [
    #other paths
    path('all-cities/', all_cities),
]
