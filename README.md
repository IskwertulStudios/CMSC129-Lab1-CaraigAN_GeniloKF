# CMSC129 Lab 1 – Tap Tap Travel

A full-stack RPG travel game built with React + Vite on the frontend and Express + MongoDB on the backend. It supports JWT auth, autosave, and a light quest system.

## Requirements
- Node.js 18+
- MongoDB (Atlas or local)

## Setup

### 1) Install dependencies
```bash
npm run install-all
```

### 2) Environment variables
Create a `.env` file in `server`:
```
JWT_SECRET=your-secret
JWT_EXPIRES_IN=24h        # optional
MONGO_URI=your-mongo-uri
MONGO_URI_BACKUP=...      # optional
PORT=5000                 # optional
```

Create a `.env` file in `client`:
```
VITE_API_BASE_URL=http://localhost:5000
```

### 3) Run the app
```bash
npm run dev
```

## API Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `DELETE /api/auth/delete`
- `GET /api/player`
- `PUT /api/player`

## Notes
- Auth uses JWT with a required `JWT_SECRET`.
- Player state is auto-saved and can also be saved manually from the UI.
- The shop rotates stock every 6 hours.
