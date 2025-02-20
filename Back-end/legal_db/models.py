from django.db import models

class LegalSection(models.Model):
    legal_section = models.CharField(max_length=100, unique=True)
    section_description = models.TextField()
    punishments = models.TextField()

    def __str__(self):
        return self.legal_section