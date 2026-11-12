
# JobBoard - MERN Stack Job Portal

A full-stack Job Portal developed using MongoDB, Express.js, React.js and Node.js.

## Project Overview

JobBoard is a web application that connects employers and job seekers. Employers can post job openings and manage applications, while candidates can search and apply for jobs.

## Features

- Candidate and Employer Registration/Login
- JWT Based Authentication
- Employer Dashboard
- Candidate Dashboard
- Post and Manage Jobs
- Search and Filter Jobs
- Job Details Page
- Apply for Jobs
- Resume Upload (PDF)
- View Job Applications
- Accept / Reject Applications
- Application Status Tracking

## Technologies Used

### Frontend
- React.js
- HTML
- CSS
- JavaScript
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- Multer

## Project Structure

JobBoard/
├── client/
├── server/
└── README.md

## Installation and Setup

### 1. Clone Repository

```bash
git clone https://github.com/yadavamit4git/JobBoard.git
```

### 2. Open Project

```bash
cd JobBoard
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the server folder.

Add:

```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/JobBoardDB
JWT_SECRET=your_own_secret_key
```

Use your own secure JWT secret.

### 5. Start Backend

```bash
npm run dev
```

### 6. Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

### 7. Start Frontend

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Database

MongoDB is used to store:
- Users
- Jobs
- Applications

## Author

Amit Yadav

GitHub: https://github.com/yadavamit4git
