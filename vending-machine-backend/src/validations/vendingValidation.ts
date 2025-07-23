import { z } from 'zod';

export const buyChocolateSchema = z.object({
    chocolateName: z.string().min(1, 'Chocolate name is required'),
    insertedCash: z.number().positive({ message: 'insertedCash must be a positive number' }),
    quantity: z.number().int().positive({ message: 'quantity must be a positive integer' }),
});
