# 🧳 Tour Explorer - MERN Stack Project

A full-stack web application to **create, view, and manage tour packages** with beautiful images and detailed descriptions. Built using the **MERN Stack** (MongoDB, Express, React, Node.js), this project showcases CRUD functionality, authentication, and responsive design.

---

## 🌟 Features

- 🖼️ Upload tours with images and detailed descriptions
- 🔍 Browse through all available tour listings
- 📝 Edit and update existing tour details
- ❌ Delete tours with confirmation
- 🔐 User authentication (Login / Signup)
- 🎨 Responsive and modern UI using Tailwind CSS
- ⚙️ Backend API using Express and MongoDB

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion (optional, for animations)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (for image uploads)
- JSON Web Token (JWT) for authentication
- dotenv (for managing environment variables)

---

## 🚀 Getting Started

### Clone the repository:


git clone https://github.com/your-username/tour-project.git
cd tour-project

##Backend Setup
cd backend
npm install

Create a .env file inside the backend directory:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

#Run the backend
npn start

##Frontend Setup
cd frontend
npn run dev

###Folder Structure
tour-project/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
├── README.md

