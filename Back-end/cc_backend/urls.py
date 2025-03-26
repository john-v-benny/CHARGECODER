from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from cc_backend.views import RegisterView, LoginView

urlpatterns = [
    path("admin/", admin.site.urls),

    # Legal database endpoints
    path("legal/", include("legal_db.urls")),

    # Redirect root to legal/
    path("", RedirectView.as_view(url="legal/")),

    # Prediction API endpoints (Separate from legal_db)
    path("api/predict/", include("prediction.urls")),

    # Authentication API endpoints
    path("api/auth/register/", RegisterView.as_view(), name="register"),
    path("api/auth/login/", LoginView.as_view(), name="login"),
]
