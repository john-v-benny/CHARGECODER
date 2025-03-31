from rest_framework import serializers
from .models import LegalSection, FamousCase

class FamousCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamousCase
        fields = ['case_name', 'summary']

class LegalSectionSerializer(serializers.ModelSerializer):
    cases = FamousCaseSerializer(many=True, read_only=True)
    
    class Meta:
        model = LegalSection
        fields = ['section_number', 'title', 'description', 'punishment', 'cases']