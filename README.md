# Debate App

## Description
Debate App is a platform where users can engage in debates on various topics, share opinions, and engage in discussions with others.

## Features
- **User authentication**: Users can sign up, log in, and manage their accounts.
- **Debate creation**: Users can create debates on different topics.
- **Joining debates**: Users can join existing debates and participate by expressing their opinions.
- **Admin panel**: Admins can manage users, debates, comments, and other aspects of the platform.

## Starting the App
1. **Backend Setup:**
   - Activate virtual environment:
     ```
     source venv/bin/activate  # For Unix/Linux
     venv\Scripts\activate  # For Windows
     ```
   - Install dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Start the backend server:
     ```
     python manage.py runserver
     ```

2. **Frontend Setup:**
   - Start the frontend server:
     ```
     npm start
     ```

3. Open your web browser and navigate to `http://localhost:3000` to access the Debate App.
