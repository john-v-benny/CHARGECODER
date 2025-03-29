# Backend - Django Application

## Project Overview
This is the backend part of a web application built using Django. The backend consists of three main apps:
- CC_BACKEND (main application)
- LEGAL_DB (manages legal sections and data)
- PREDICTION (provides prediction APIs)

## Prerequisites
Ensure that you have the following installed:
- Python 3.8+
- pip (Python package installer)
- Virtualenv (optional but recommended)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ASHISH-28-02
   ```

2. Navigate to the backend directory:
   ```bash
   cd Back-end
   ```

3. (Optional) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

4. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Setting Up the Database
1. Run migrations to set up the database:
   ```bash
   python manage.py migrate
   ```

2. Load initial data into the database:
   - Try using the following command first:
     ```bash
     python manage.py loaddata legal_db/ITSECTIONS.json
     ```
   - If the above command does not work, you can load the data manually using the Python shell:
     ```bash
     python manage.py shell
     ```
     Then, enter the following:
     ```python
     import json
     from legal_db.models import LegalSection
     
     with open('legal_db/ITSECTIONS.json') as f:
         data = json.load(f)
         for item in data:
             LegalSection.objects.create(**item['fields'])
     ```

## Downloading the Model
1. Download the pre-trained model from [Google Drive Link](https://drive.google.com/drive/folders/1w3nESh5E5Uh7q_tMbZYVyNiPfMAJhfEF?usp=drive_link) 
2. Place the downloaded model file in the backend directory:
   ```
   CHARGECODER/Back-End/fine_tuned_bert_cybercrime
   ```

## Running the Server
1. Start the development server:
   ```bash
   python manage.py runserver
   ```

2. Visit the server at:
   ```
   http://127.0.0.1:8000/
   ```

## API Endpoints
- Legal Database:
  - `GET /legal/` - List all legal sections.
  - `GET /legal/search/` - Search for legal sections.
- Prediction:
  - `POST /api/predict/` - Get predictions.
- Authentication:
  - `POST /api/auth/register/` - User registration.
  - `POST /api/auth/login/` - User login.

## Troubleshooting
If you encounter any issues, try the following:
- Make sure all dependencies are correctly installed.
- Verify that the model folder is placed correctly.
- Check if the virtual environment (optional) is activated.

## License
This project is licensed under the MIT License.

