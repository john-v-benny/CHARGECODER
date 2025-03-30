# CHARGECODER

The project addresses the need for an automated system to convert user statements into legally compliant charges, along with the corresponding punishments under India's Cyber Crime laws, BNs and IT Act, 2000.

# FEATURES
- Provides Corresponding leagal sections and its details for the user input
- Displays the punishments corresponding to the sections identified
- User can get more details on the legal sections


## **Prerequisites**

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for frontend)
- [Python](https://www.python.org/) (for backend)
- [Git](https://git-scm.com/)
- [Pip](https://pip.pypa.io/en/stable/installation/) (Python package manager)
- [Virtualenv](https://virtualenv.pypa.io/en/latest/) (optional, for Python virtual environment)

---

## **Backend Setup**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo/Back-end
   ```

2. **Set Up a Virtual Environment (optional but recommended)**:
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**:
   
   On Windows:
   ```bash
   .\venv\Scripts\activate
   ```
   
   On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Set Up the Database**:
   
   Apply migrations:
   ```bash
   python manage.py migrate
   ```
   
   Load fixture data (if applicable):
   ```bash
   python manage.py loaddata new_it_act_database.json
   ```

6. **Create a Superuser (optional, for Django admin access)**:
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the Backend Server**:
   ```bash
   python manage.py runserver
   ```
   The backend will be available at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

## **Frontend Setup**

1. **Navigate to the Frontend Folder**:
   ```bash
   cd ../Front-end
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend Server**:
   ```bash
   npm start
   ```
   The frontend will be available at [http://localhost:3000/](http://localhost:5173/).

---

## **Running the Project**

1. **Start the Backend**:
   Navigate to the Back-end folder and run:
   ```bash
   python manage.py runserver
   ```

2. **Start the Frontend**:
   Navigate to the Front-end folder and run:
   ```bash
   npm start
   ```

3. **Access the Application**:
   Open your browser and go to [http://localhost:3000/](http://localhost:5173/) to view the frontend.
   
   The backend API will be available at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

## **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add your feature"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a pull request.**

---

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

---

## **Contact**

For questions or support, please contact:

- **Your Name**: johnvbenny@gmail.com
- **Project Link**: https://github.com/john-v-benny/CHARGECODER
    
