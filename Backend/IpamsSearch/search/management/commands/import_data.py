import json
from django.core.management.base import BaseCommand
from search.models import researchpaper  # Replace 'myapp' with your app name

class Command(BaseCommand):
    help = 'Import research papers from JSON file'

    def add_arguments(self, parser):
        parser.add_argument('jsonfile', type=str)

    def handle(self, *args, **kwargs):
        jsonfile = kwargs['jsonfile']

        with open(jsonfile, 'r') as file:
            data = json.load(file)  # Load the JSON data from the file

            for item in data:
                record_type_mapping = {
                    '1 (Proposal, 2 Thesis/Research, 3 Project)': 1,
                    '2 (Thesis/Research)': 2,
                    '3 (Project)': 3,
                    # Add mappings for other record types if needed
                }

                classification_mapping = {
                    '1 (Basic Research, 2 Applied Research)': 1,
                    '2 (Applied Research)': 2,
                    # Add mappings for other classifications if needed
                }

                # Get the record_type and classification from the JSON data
                record_type_str = item['Record Type \n(1 - Proposal, 2 - Thesis/Research, 3 - Project)']
                classification_str = item['Classification \n(1 - Basic Research, 2 - Applied Research)\\']

                # Map the record_type and classification to integers, defaulting to 1 if not found in mappings
                record_type = record_type_mapping.get(record_type_str, 1)
                classification = classification_mapping.get(classification_str, 1)

                # Now, create the researchpaper object using the mapped values
                researchpaper.objects.create(
                    title=item['Title'],
                    abstract=item['Abstract'],
                    year=item['Year'],
                    record_type=record_type,
                    classification=classification,
                    psc_ed=item['PSCED'],
                    author=item['Author']
                )

        self.stdout.write(self.style.SUCCESS('Data imported successfully.'))
