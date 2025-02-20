from django.shortcuts import render
from .models import LegalSection

def legal_section_list(request):
    sections = LegalSection.objects.all()
    return render(request, 'legal_db/section_list.html', {'sections': sections})