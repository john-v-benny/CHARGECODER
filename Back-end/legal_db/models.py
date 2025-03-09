from django.db import models

class LegalSection(models.Model):
    legal_section = models.CharField(max_length=100)
    section_description = models.TextField()
    punishments = models.TextField()
    famous_cases = models.TextField(null=True, blank=True)      

    def __str__(self):
        return self.legal_section