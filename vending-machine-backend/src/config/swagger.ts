import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { Express } from 'express';

const swaggerFilePath = path.resolve(__dirname, '../../swagger/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
