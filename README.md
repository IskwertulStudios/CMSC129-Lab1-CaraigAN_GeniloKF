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

## Backup + DR (Atlas Configuration)
This project uses **Atlas configuration** (not app code) for primary/backup handling.

Primary cluster:
- Enable **Continuous Cloud Backup / Point-in-Time Restore**.
- Configure retention per course requirements.

Backup cluster:
- Restore from the primary’s backups on a schedule (hourly recommended).
- Use Atlas UI or Atlas CLI/Admin API automation for scheduled restores.

Failover runbook:
1. Restore the latest backup to the backup cluster (or verify scheduled restore ran).
2. Promote the backup cluster by updating `MONGO_URI` to the backup cluster URI.
3. Restart the server.

## Notes
- Auth uses JWT with a required `JWT_SECRET`.
- Player state is auto-saved and can also be saved manually from the UI.
- The shop rotates stock every 6 hours.
