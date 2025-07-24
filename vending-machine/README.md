# Vending Machine – Full Stack Project

A full stack vending machine application with a React + TypeScript frontend and a Node.js + Express + Prisma backend.

---

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Material UI, Jest, React Testing Library
- **Backend:** Node.js, Express, TypeScript, Prisma, SQLite, Zod, Jest, Swagger
- **Deployment:** Frontend on Vercel, Backend on railway

---

## Live URLs

- **Frontend (Vercel):** [https://vending-machine-navy.vercel.app/](https://vending-machine-navy.vercel.app/)
- **Backend (Railway):** https://hearty-stillness-production.up.railway.app/

---

## How to Run the App

### Backend (Local or Docker)

1. **Navigate to backend directory:**
   ```bash
   cd vending-machine-backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up the database:**
   ```bash
   npm run migrate 
   npm run seed
   ```
4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend runs on `http://localhost:3000`.

#### Run Backend with Docker

1. From the `vending-machine` directory:
   ```bash
   sudo docker-compose up --build
   ```
   - This will build and run both backend and frontend containers.
   - Backend: http://localhost:3000
   - Frontend: http://localhost:5173

2. To stop and remove containers:
   ```bash
   sudo docker-compose down
   ```

### Frontend (Local)

1. **Navigate to frontend directory:**
   ```bash
   cd vending-machine/vending-machine-frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the frontend:**
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` by default.

---

## Frontend Docker Usage

A `Dockerfile` is provided in `vending-machine/vending-machine-frontend` for containerizing the frontend app.

### Build the Docker image:
```bash
cd vending-machine/vending-machine-frontend
sudo docker build -t vending-frontend .
```

### Run the container:
```bash
sudo docker run -d -p 5173:5173 --name vending-frontend-container vending-frontend
```

- The app will be available at [http://localhost:5173](http://localhost:5173)
- The Dockerfile uses Vite's preview server for production: `CMD ["npm", "run", "preview", "--", "--host"]`
- For local development, use `npm run dev` instead.

---

## API Documentation

- The backend API is documented with Swagger.
- Access docs at: `http://localhost:3000/api-docs`
- OpenAPI spec: `vending-machine-backend/swagger/swagger.json`

---

## Assumptions

- The vending machine accepts only specific denominations as defined in the backend logic.
- Product inventory and coin stock are managed in the database and must be sufficient for a transaction to succeed.
- All API requests are validated using Zod schemas for type and structure.
- The database is seeded with initial data for development and testing; production deployments should use persistent storage.
- Change is dispensed only if the machine has enough coins; otherwise, the purchase is rejected.
- Error responses are always in JSON format with appropriate HTTP status codes.

---

## Project Structure

```
vending-machine-backend/
  # Backend code, API, database, docs
vending-machine/vending-machine-frontend/
  # Frontend React app
```

---

## Testing

- **Backend:** Run `npm run test` in `vending-machine/vending-machine-backend`
- **Frontend:** Run `npm run test` in `vending-machine/vending-machine-frontend`

---

## Notes on Docker

- The provided `docker-compose.yml` builds and runs both backend and frontend containers.
- Make sure ports 3000 (backend) and 5173 (frontend) are free before running Docker Compose.
- For SQLite, the database is not persistent across container rebuilds unless you mount a volume.
