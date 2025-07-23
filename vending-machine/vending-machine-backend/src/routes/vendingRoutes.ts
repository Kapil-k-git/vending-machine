import express from 'express';
import {
    getInventory,
    buyChocolate,
    restock,
    addCash
} from '../controllers/vendingController';

import { buyChocolateSchema } from '../validations/vendingValidation';
import { validateRequest } from '../middlewares/validateRequest';
const router = express.Router();

router.get('/inventory', getInventory);
router.post('/buy', validateRequest(buyChocolateSchema), buyChocolate);
router.post('/restock', restock);
router.post('/add-cash', addCash);

export default router;
