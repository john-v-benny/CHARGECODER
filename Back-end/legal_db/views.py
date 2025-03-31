from django.shortcuts import render
from django.db import models  # Make sure this import is added
from .models import LegalSection, FamousCase
from rest_framework import generics
from .serializers import LegalSectionSerializer

def legal_section_list(request):
    sections = LegalSection.objects.all().prefetch_related('cases')
    return render(request, 'legal_db/section_list.html', {'sections': sections})

class LegalSectionSearchView(generics.ListAPIView):
    serializer_class = LegalSectionSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            return LegalSection.objects.filter(
                models.Q(section_number__icontains=query) |
                models.Q(title__icontains=query) |
                models.Q(description__icontains=query)
            )  # This parenthesis was missing
        return LegalSection.objects.all().prefetch_related('cases')