from django.urls import path
from . import views
from .views import LegalSectionSearchView

urlpatterns = [
    path('', views.legal_section_list, name='legal_section_list'),
    path('search/', LegalSectionSearchView.as_view(), name='legal_section_search'),
]