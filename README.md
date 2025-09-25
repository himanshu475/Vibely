# 🎉 Building Vibely: Your Local Event & Hobby Buddy Finder

**Vibely** is a full-stack MERN application designed to connect people with local events and new friends who share similar hobbies. Unlike larger platforms, Vibely focuses on creating **small, casual, and interest-driven groups** in your local area.

---

## 🚀 Key Features

- **User Authentication**: Secure sign-up and login with email/password and JWT.  
- **Profile Management**: A dedicated profile page where users can update their city, bio, and hobbies.  
- **Event Management**: Authenticated users can create, update, and delete events.  
- **Event Discovery**: A public-facing event feed with advanced filtering by city, category, and tags.  
- **Join Requests**: A secure system for users to send join requests and for hosts to accept or decline them.  

---

## 🛠 Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment.  
- **Express**: Web application framework for building the API.  
- **MongoDB**: NoSQL database for flexible data storage.  
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.  
- **JWT & bcrypt**: For secure, token-based authentication and password hashing.  
- **CORS**: Middleware to enable cross-origin requests from the frontend.  

### Frontend
- **React**: A JavaScript library for building the user interface.  
- **Vite**: A fast, modern build tool for frontend development.  
- **Tailwind CSS**: A utility-first CSS framework for rapid styling.  
- **React Router Dom**: For handling client-side routing and navigation.  
- **Axios**: For making API requests to the backend.  
- **Context API**: For global state management of user authentication.  

---

## 🚦 Getting Started

### 1️⃣ Prerequisites
- Node.js (v18 or higher)  
- npm (v8 or higher)  
- MongoDB Atlas account  

### 2️⃣ Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend server
npm run dev


## 📅 Next Steps & Future Features

This project is a work in progress, with the following features planned:

- **Real-time Event Chat**: Implementing Socket.IO for real-time chat rooms for event participants.  
- **AI-based Suggestions**: Recommending events and hobby buddies with similar interests.  
- **User Profiles & Connections**: Adding a public-facing user profile page and a system for making connections.  
- **Google Calendar Integration**: Syncing events with a user's Google Calendar.  

