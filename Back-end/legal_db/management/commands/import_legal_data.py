import csv
from django.core.management.base import BaseCommand
from legal_db.models import LegalSection

class Command(BaseCommand):
    help = 'Import legal data from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']
        with open(csv_file, newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                LegalSection.objects.create(
                    legal_section=row['legal_section'],
                    section_description=row['section_description'],
                    punishments=row['punishments'],
                )
        self.stdout.write(self.style.SUCCESS('Data imported successfully'))