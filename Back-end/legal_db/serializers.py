from rest_framework import serializers
from .models import LegalSection

class LegalSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalSection
        fields = ['legal_section', 'section_description', 'punishments']

        