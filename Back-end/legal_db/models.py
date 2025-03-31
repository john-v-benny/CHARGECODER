from django.db import models

class LegalSection(models.Model):
    section_number = models.CharField(max_length=20)
    title = models.CharField(max_length=200)
    description = models.TextField()
    punishment = models.TextField()
    
    def __str__(self):
        return f"{self.section_number} - {self.title}"

class FamousCase(models.Model):
    legal_section = models.ForeignKey(LegalSection, related_name='cases', on_delete=models.CASCADE)
    case_name = models.CharField(max_length=200)
    summary = models.TextField()
    
    def __str__(self):
        return self.case_name