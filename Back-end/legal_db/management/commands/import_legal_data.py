import json
from django.core.management.base import BaseCommand
from legal_db.models import LegalSection

class Command(BaseCommand):
    help = 'Import legal data from a JSON file and replace existing data'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Path to the JSON file')

    def handle(self, *args, **kwargs):
        json_file = kwargs['json_file']
        try:
            # Delete all existing data
            LegalSection.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Deleted existing data.'))

            # Import new data
            with open(json_file, 'r', encoding='utf-8') as file:
                data = json.load(file)
                for row in data:
                    # Create new legal section
                    LegalSection.objects.create(
                        legal_section=row['SECTION'],
                        section_description=row['DESCRIPTION'],
                        punishments=row['PUNISHMENT'],
                        famous_cases=row['FAMOUS CASES'],
                    )
                    self.stdout.write(f"Imported: {row['SECTION']}")
            self.stdout.write(self.style.SUCCESS('Data imported successfully'))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File not found: {json_file}'))
        except json.JSONDecodeError:
            self.stdout.write(self.style.ERROR(f'Invalid JSON format in file: {json_file}'))
        except KeyError as e:
            self.stdout.write(self.style.ERROR(f'Missing key in JSON data: {e}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {e}'))