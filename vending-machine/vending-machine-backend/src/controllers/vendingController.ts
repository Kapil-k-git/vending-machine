import { Request, Response } from 'express';
import * as vendingService from '../services/vendingService';


export const getInventory = async (req: Request, res: Response) => {
    try {
        const inventory = await vendingService.getInventory();
        res.json(inventory);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const buyChocolate = async (req: Request, res: Response) => {
    try {
        const { chocolateName, insertedCash, quantity } = req.body;

        if (!chocolateName || typeof insertedCash !== 'number' || typeof quantity !== 'number') {
            return res.status(400).json({ error: 'chocolateName, quantity and insertedCash are required.' });
        }

        const result = await vendingService.buyChocolate(chocolateName, insertedCash, quantity);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};


export const restock = async (req: Request, res: Response) => {
    try {
        const { chocolateName, quantity } = req.body;

        if (!chocolateName || typeof quantity !== 'number') {
            return res.status(400).json({ error: 'chocolateName and quantity are required.' });
        }

        const result = await vendingService.restockChocolates(chocolateName, quantity);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};


export const addCash = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const currentBalance = await vendingService.addCashToUser(amount);

    return res.status(200).json({
      message: `Successfully added ₹${amount}`,
      currentBalance,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};