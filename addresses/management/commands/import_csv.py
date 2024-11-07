import csv
from django.core.management.base import BaseCommand
from addresses.models import LGA, State  # Adjust to your app's structure


class Command(BaseCommand):
    help = 'Load data from a CSV file into the LGA model'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str,
                            help='The CSV file to load data from')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']
        try:
            with open(csv_file, newline='', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    # Fetch the State instance by ID or any other field
                    state_id = row['state_id']
                    try:
                        state = State.objects.get(id=state_id)
                    except State.DoesNotExist:
                        self.stdout.write(self.style.ERROR(
                            f"State with ID {state_id} does not exist. Skipping row."))
                        continue

                    # Check if an LGA with the same title already exists
                    # Assuming 'title' is the column in the CSV
                    title = row['LGA']
                    if LGA.objects.filter(title=title).exists():
                        self.stdout.write(self.style.WARNING(
                            f"LGA with title '{title}' already exists. Skipping row."))
                        continue

                    # Now create the LGA instance with the State instance
                    lga = LGA(
                        # id=row['id'],
                        title=row['LGA'],  # Assigning the title from the CSV
                        state=state  # Assigning the State instance
                    )
                    lga.save()
                self.stdout.write(self.style.SUCCESS(
                    'Data successfully imported'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {e}'))
