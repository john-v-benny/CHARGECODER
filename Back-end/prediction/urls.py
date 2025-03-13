from django.urls import path
from .views import predict_section

urlpatterns = [
    path("", predict_section, name="predict_section"),  # Now accessible via /api/predict/
]
