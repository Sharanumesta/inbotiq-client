# Authentication System (MERN Stack)

A full-stack **Role-Based Authentication Web App** built using the **MERN stack** with a responsive UI, secure authentication, and deployed frontend + backend.

This project demonstrates:
- Full-stack development  
- Authentication & role management  
- Protected routes  
- JWT security  
- Deployment (Netlify + Render)  

---

## 🌐 Live Demo

### **Frontend (Netlify)**  
https://inbotiq.netlify.app/

### **Backend (Render)**  
https://inbotiq-server.onrender.com  
*(Root URL only — API endpoints are internal)*

---

## 🔥 Features

### 🔐 Authentication
- Signup with **User / Admin roles**
- Login with JWT token
- Password hashing (bcryptjs)
- Token-based user session (localStorage)
- SweetAlert messages for login/signup/logout
- Client-side validation (email, password, name)

### 🛡 Protected Routing
- Dashboard accessible only when logged in
- Admin and User dashboard UI variations
- Auto-redirect:
  - Logged-in users → cannot access login/signup  
  - Not logged-in users → redirected to login  
- Logout confirmation using SweetAlert2

### 🎨 Frontend UX (React)
- Built with React (Vite)
- TailwindCSS for fully responsive UI
- Axios for API calls
- React Router v6
- Password visibility toggle (react-icons)
- 404 Not Found page
- Loading skeletons for dashboard

### 🗄 Backend API (Node + Express)
- MongoDB Atlas using Mongoose
- JWT Authentication
- Secure password hashing
- `auth/me` protected endpoint
- CORS enabled for deployed frontend

---

## 🛠 Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- Axios
- React Router v6
- SweetAlert2
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- bcryptjs
- jsonwebtoken
- dotenv
- cors

---

## 🔗 API Resources

### 🧪 Postman API Collection  
Use this link to test backend routes:

https://alone7-8517.postman.co/workspace/Alone-Workspace~e9c75852-334e-4411-a7fd-4319c6f95992/collection/25239808-7feddbb9-b2f9-4af1-a4ab-3531468f779d?action=share&creator=25239808&active-environment=25239808-f4681c39-bfa0-4d7a-b10a-5680533bec3c

---

## 📡 Backend API (High-Level Overview)

| Method | Endpoint            | Description                  |
|--------|----------------------|------------------------------|
| POST   | /api/auth/signup     | Register a new user         |
| POST   | /api/auth/login      | Login and return JWT token  |
| GET    | /api/auth/me         | Fetch authenticated user    |

Protected endpoints require:
Authorization: Bearer <token>

---

## 🔧 Environment Variables

### Frontend `.env`
Create this file in the project root:

    VITE_API_URL=https://inbotiq-server.onrender.com

## 📦 Installation & Setup

### Clone the frontend

```bash
git clone https://github.com/Sharanumesta/inbotiq-client
cd inbotiq-client
npm install
```

### Clone & Install Backend
```bash
git clone https://github.com/Sharanumesta/inbotiq-server
cd inbotiq-server
npm install
```
## 🖥 Development

Run locally:

    npm run dev

App runs at:

    http://localhost:5173

---

## 📦 Production Build

Build:

    npm run build

Preview:

    npm run preview

Output folder:

    dist/

---

## 🚀 Deployment (Netlify)

Setup on Netlify:

**Build command:**

    npm run build

**Publish directory:**

    dist

**Environment Variables:**

    VITE_API_URL=<your-backend-url>

Add `_redirects` file inside **public**:

    /*    /index.html   200

Required for React Router refresh support.

---

## 📁 Folder Structure

    public/
     └── _redirects

    src/
     ├── pages/
     │    ├── Login.jsx
     │    ├── Signup.jsx
     │    ├── Dashboard.jsx
     │    └── NotFound.jsx
     │
     ├── components/
     │    └── Logout.jsx
     │
     ├── utils/
     │    └── auth.js
     │
     ├── main.jsx
     └── App.jsx

---

## 🔐 Authentication Flow

- User signs up or logs in via `/signup` or `/login`
- Backend issues a JWT stored in `localStorage`
- Dashboard fetches the logged-in user using `/auth/me`
- If token is missing or invalid → redirect to login
- If logged in → block access to login/signup pages
- Logout uses SweetAlert confirmation and clears token

---

## 🧙 Author

**Sharanu**  
---

⭐ If this project helped you, please star the repository!
