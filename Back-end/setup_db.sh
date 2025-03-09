#!/bin/bash
# Apply migrations
python manage.py migrate

# Load the fixture data
python manage.py loaddata new_it_act_database.json

echo "Database setup complete!"