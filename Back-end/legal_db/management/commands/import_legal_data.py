import json
from django.core.management.base import BaseCommand
from legal_db.models import LegalSection, FamousCase

class Command(BaseCommand):
    help = 'Import legal data from IT Act JSON file'

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
                act_data = data['Information_Technology_Act_2000']
                
                for section_data in act_data['sections']:
                    # Create legal section
                    legal_section = LegalSection.objects.create(
                        section_number=section_data['section_number'],
                        title=section_data['title'],
                        description=section_data['description'],
                        punishment=section_data['punishment']
                    )
                    
                    # Create famous cases if they exist
                    if 'cases' in section_data:
                        for case_data in section_data['cases']:
                            FamousCase.objects.create(
                                legal_section=legal_section,
                                case_name=case_data['case_name'],
                                summary=case_data['summary']
                            )
                    
                    self.stdout.write(f"Imported: {section_data['section_number']} - {section_data['title']}")
            
            self.stdout.write(self.style.SUCCESS('Data imported successfully'))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File not found: {json_file}'))
        except json.JSONDecodeError:
            self.stdout.write(self.style.ERROR(f'Invalid JSON format in file: {json_file}'))
        except KeyError as e:
            self.stdout.write(self.style.ERROR(f'Missing key in JSON data: {e}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {e}'))