from django.urls import path
from . import views

urlpatterns = [
    path('', views.legal_section_list, name='legal_section_list'),
]