# Attendance Management System

Attendance Management System is a web application designed for managing attendance and leave requests for staff members. It provides features for both staff and admin users to facilitate attendance tracking and leave management efficiently.

## Features

### For Staff Users:
- User registration and login using JWT token authentication.
- Ability to mark attendance.
- Requesting leave.
- Viewing the status of leave requests.
- Logout functionality.
- State management using Recoil.

### For Admin Users:
- Admin login with JWT token authentication.
- Viewing the list of staff members.
- Accessing staff details including name, email, and location.
- Viewing attendance records of staff members.
- Selecting start and end dates to view attendance.
- Viewing the status of leave requests.
- Approving or rejecting leave requests.
- Viewing staff attendance in graphical charts.
- Generating staff attendance report 
- Logout functionality.

## Deployment

### Frontend:

1. Navigate to the frontend directory:
cd frontend

2. Install frontend dependencies:
npm install

3. Run the frontend application:
npm start

4. Access the frontend application through your web browser at the provided URL.

### Backend:

1. Navigate to the backend directory:
cd backend

2. Install backend dependencies:
npm install

3. Set up environment variables as required (MongoDB).

4. Run the backend server:
node index.js

Ensure that the backend server is running before accessing the frontend application.

