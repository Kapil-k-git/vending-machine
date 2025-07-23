import express from 'express';
import cors from 'cors';
import vendingRoutes from './routes/vendingRoutes';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', vendingRoutes);

// Swagger
setupSwagger(app);

export default app;
