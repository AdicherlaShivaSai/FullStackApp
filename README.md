
# Full Stack Web App – React + Node.js + MySQL

This is a full-stack web application built with:

- ⚛️ React (Frontend)
- 🖥 Node.js + Express (Backend)
- 💾 MySQL (Database)
- 🔐 JWT-based Authentication

---

## 📂 Project Structure

```
project-root/
├── client/         # React frontend
│   └── .env
├── server/         # Node.js backend
│   └── .env
└── README.md
```

---

## 🧪 Local Development

### 🔹 1. Backend Setup

```bash
cd server
npm install
touch .env
```

`.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
JWT_SECRET=yourSecretKey
PORT=3001
```

Start the backend:
```bash
npm start
```

### 🔹 2. Frontend Setup

```bash
cd client
npm install
touch .env
```

`.env` file:
```env
REACT_APP_API_URL=http://localhost:3001
```

Start the frontend:
```bash
npm start
```

Visit the app at:  
➡️ `http://localhost:3000`

---

## 🚀 Deployment Guide

### 🌐 Frontend on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Import GitHub repo
3. Set root directory: `client/`
4. Set environment variable:
   ```env
   REACT_APP_API_URL=https://your-backend.onrender.com
   ```

---

### ⚙️ Backend on Render

1. Go to [https://render.com](https://render.com)
2. New Web Service → Select repo
3. Set root directory: `server/`
4. Set environment variables:
   ```env
   DB_HOST=...
   DB_USER=...
   DB_PASSWORD=...
   DB_NAME=...
   JWT_SECRET=...
   ```
5. Set:
   - **Build command**: `npm install`
   - **Start command**: `node index.js`

---

## 🔐 Auth Flow

- JWT tokens are stored in `localStorage`
- Backend routes are protected with middleware: `validateToken`
- Token is sent as a custom header: `accessToken`

---

## 📦 Scripts

### In `server/package.json`

```json
"scripts": {
  "start": "node index.js"
}
```

### In `client/package.json`

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build"
}
```

---

## 🛡 Security Tips for Production

- Use `dotenv` and `.env` files for secrets
- Use HTTPS in production (Render and Vercel support it)
- Protect sensitive routes with `validateToken`
- Sanitize inputs if handling raw SQL

---

