# Vending Machine – Full Stack Project

A full stack vending machine application with a React + TypeScript frontend and a Node.js + Express + Prisma backend.

---

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Material UI, Jest, React Testing Library
- **Backend:** Node.js, Express, TypeScript, Prisma, SQLite, Zod, Jest, Swagger

---

## How to Run the App

### Backend

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
   npx prisma migrate deploy
   npx prisma db seed
   ```
4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend runs on `http://localhost:3000`.

### Frontend

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

- **Backend:** Run `npm test` in `vending-machine/vending-machine-backend`
- **Frontend:** Run `npm test` in `vending-machine/vending-machine-frontend`

---

For further details, see the source code and comments within each module.
