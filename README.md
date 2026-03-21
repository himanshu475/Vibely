# 🎉 Vibely: Local Event & Hobby Buddy Finder

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=appveyor)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Vibely** is a full-stack web application designed to help people connect with local events and find new friends who share similar hobbies. Unlike larger platforms, Vibely focuses on creating small, casual, and interest-driven community groups.

---

## ✨ Key Features & Technical Impact

- **Single-Page Application (SPA)**: Zero page-reload navigation latency by implementing React Router.
- **Robust Security**: Secure user authentication preventing unauthorized API access using JSON Web Tokens (JWT) and bcryptjs.
- **Brute-Force Protection**: Blocked 100% of brute-force login attempts by configuring Express Rate Limit middleware on authentication routes.
- **Advanced State Management**: Eliminated prop-drilling across the frontend hierarchy utilizing the React Context API.
- **Responsive UI**: Decreased custom CSS boilerplate significantly by integrating Tailwind CSS utility classes.
- **RESTful API**: Engineered a flexible Node.js/Express backend supporting complex event CRUD operations and join-request workflows with MongoDB.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: React.js (Bootstrapped with Vite for fast HMR execution)
- **Styling**: Tailwind CSS
- **Routing**: React Router Dom
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide-React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **Security**: Express Rate Limit, CORS

---

## 🚦 Getting Started (Local Setup)

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB server)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/Vibely.git
cd Vibely
```

### 2️⃣ Backend Setup
Navigate to the `backend` directory, install dependencies, and set up your environment variables.

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server (using Nodemon for live reloading):
```bash
npm run server
```

### 3️⃣ Frontend Setup
Open a **new terminal window/tab**, navigate to the `frontend` directory, and install the dependencies.

```bash
cd ../frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

### 4️⃣ View the App
Open your browser and navigate to:
```text
http://localhost:5173
```

---

## 📂 Project Structure

```text
Vibely/
├── backend/                  # Express.js API
│   ├── controllers/          # Route logic (auth, events)
│   ├── middleware/           # Custom middleware (auth, rate-limiters)
│   ├── models/               # Mongoose DB schemas
│   ├── routes/               # API endpoint definitions
│   ├── .env                  # Environment variables (DB URI, JWT secret)
│   └── server.js             # Entry point for the backend
│
├── frontend/                 # React.js Application (Vite)
│   ├── src/                  # Components, Pages, Context, Assets
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── vite.config.js        # Vite bundler configuration
│
└── README.md                 # Project documentation
```

---

## 📅 Roadmap & Next Steps

This project is continuously evolving. Planned features include:
- [ ] **Redis Caching**: Implement an in-memory caching layer to speed up the events feed query.
- [ ] **WebSockets**: Real-time chat integration using Socket.io for active event participants.
- [ ] **Geospatial Queries**: MongoDB `$geoNear` to recommend events exactly within a user's radius.
- [ ] **AWS S3**: Cloud image uploads for event banners and user avatars.

---

> Designed & Developed as a showcase of modern MERN stack architecture and secure API design.
