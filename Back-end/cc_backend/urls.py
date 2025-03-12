from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path("admin/", admin.site.urls),
    
    # Legal database endpoints
    path("legal/", include("legal_db.urls")),

    # Redirect root to legal/
    path("", RedirectView.as_view(url="legal/")),

    # Prediction API endpoints (Separate from legal_db)
    path("api/predict/", include("prediction.urls")),
]
