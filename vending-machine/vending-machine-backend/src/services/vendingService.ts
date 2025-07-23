import prisma from '../config/prismaClient';
import { calculateChange } from '../utils/changeCalculator';

export const getInventory = async () => {
    const [chocolates, userCash] = await Promise.all([
        prisma.chocolate.findMany(),
        prisma.userCash.findUnique({ where: { id: 1 } }),
    ]);
    return {
        chocolates,
        userCash: userCash?.cash ?? 0,
    };
};

export const buyChocolate = async (
    chocolateName: string,
    insertedCash: number,
    quantity: number
) => {
    const chocolate = await prisma.chocolate.findUnique({
        where: { name: chocolateName },
    });

    if (!chocolate) throw new Error("Chocolate not found");
    if (chocolate.quantity < quantity) throw new Error("Not enough stock available");



    const totalPrice = chocolate.price * quantity;

    const userCash = await prisma.userCash.findUnique({ where: { id: 1 } });
    if (!userCash) throw new Error("UserCash record not found");

    if (insertedCash < totalPrice) throw new Error("Insufficient cash inserted");


    const change = calculateChange(insertedCash, totalPrice);

    // Reduce chocolate stock
    await prisma.chocolate.update({
        where: { name: chocolateName },
        data: { quantity: chocolate.quantity - quantity },
    });

    const newBalance = userCash.cash - totalPrice;
    if (newBalance < 0) {
        throw new Error("Not enough balance");
    }
    // Reduce user balance
    await prisma.userCash.update({
        where: { id: 1 },
        data: { cash: userCash.cash - totalPrice },
    });

    return {
        message: `${quantity} ${chocolateName} purchased successfully`,
        totalPrice,
        change,
        remainingUserBalance: userCash.cash - totalPrice,
    };
};

export const restockChocolates = async (chocolateName: string, quantity: number) => {
    const chocolate = await prisma.chocolate.findUnique({
        where: { name: chocolateName },
    });

    if (!chocolate) {
        throw new Error('Chocolate not found.');
    }

    const newStock = chocolate.quantity + quantity;

    if (newStock > 10) {
        throw new Error(`Cannot restock beyond 10 units. Current stock: ${chocolate.quantity}`);
    }

    const updated = await prisma.chocolate.update({
        where: { name: chocolateName },
        data: {
            quantity: {
                increment: quantity,
            },
        },
    });
    return updated;
};

export const addCashToUser = async (amount: number) => {
    if (!amount || amount <= 0) {
        throw new Error('Amount must be greater than 0');
    }

    const updated = await prisma.userCash.update({
        where: { id: 1 },
        data: {
            cash: {
                increment: amount,
            },
        },
    });

    return updated.cash;
};
