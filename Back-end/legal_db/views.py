from django.shortcuts import render
from .models import LegalSection
from rest_framework import generics
from .serializers import LegalSectionSerializer

def legal_section_list(request):
    sections = LegalSection.objects.all()
    return render(request, 'legal_db/section_list.html', {'sections': sections})

class LegalSectionSearchView(generics.ListAPIView):
    serializer_class = LegalSectionSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            return LegalSection.objects.filter(legal_section__icontains=query)
        return LegalSection.objects.all()