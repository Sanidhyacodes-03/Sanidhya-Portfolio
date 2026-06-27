# Sanidhya Singh Sisodiya — Portfolio Website

A clean, responsive, full-stack personal portfolio website built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

## Features
- Modern responsive React frontend
- Dark / light mode toggle
- SEO-friendly HTML structure and metadata
- Hero section with strong professional introduction
- About / resume timeline for education, coursework, leadership, and achievements
- Projects grid with current and future projects
- Contact form connected to Express + MongoDB
- Email notification support using Nodemailer

## Tech Stack
### Frontend
- React.js
- Vite
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer
- CORS / dotenv

## Project Structure
```
portfolio-site/
├── client/
│   ├── src/
│   ├── index.html
│   └── package.json
├── server/
│   ├── models/
│   ├── server.js
│   └── package.json
└── README.md
```

## Getting Started

### 1) Frontend setup
```bash
cd client
npm install
npm run dev
```

### 2) Backend setup
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## Environment Variables
Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sanidhya_portfolio
CLIENT_URL=http://localhost:5173
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
EMAIL_TO=your_email@example.com
```

Create `client/.env` if needed:
```env
VITE_API_BASE_URL=http://localhost:5000
```

## Deployment
### Frontend
Deploy `client` on Vercel or Netlify.

### Backend
Deploy `server` on Render, Railway, or Cyclic.

### Database
Use MongoDB Atlas for production.

## Suggested Final Deliverables
- Live portfolio website link
- Public GitHub repository
- README with setup and deployment steps

## Notes
This project uses **real profile content** for Sanidhya Singh Sisodiya and is designed to feel professional enough for recruiters and clients.
