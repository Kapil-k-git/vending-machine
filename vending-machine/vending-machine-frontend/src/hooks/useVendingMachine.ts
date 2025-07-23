import { useState } from "react";
import { Chocolate } from "@/types";
import {
  fetchInventoryAPI,
  restockChocolateAPI,
  buyChocolateAPI,
  addCashAPI,
} from "@/utils/api";

export const useVendingMachine = () => {
  const [chocolates, setChocolates] = useState<Chocolate[]>([]);
  const [userCash, setUserCash] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const data = await fetchInventoryAPI();
      setChocolates(data.chocolates);
      setUserCash(data.userCash);
    } catch (err) {
      setMessage(err);
    } finally {
      setLoading(false);
    }
  };

  const restockChocolate = async (name: string, quantity: number) => {
    try {
      await restockChocolateAPI(name, quantity);
      setChocolates((prev) =>
        prev.map((c) =>
          c.name === name
            ? { ...c, quantity: Math.min(c.quantity + quantity, 10) }
            : c
        )
      );
      setMessage(` ${name} restocked successfully.`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const buyChocolate = async (
    name: string,
    insertedCash: number,
    quantity: number
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await buyChocolateAPI(name, insertedCash, quantity);
      fetchInventory();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
  

  const addCash = async (amount: number) => {
    try {
      const res = await addCashAPI(amount);
      setUserCash(res.currentBalance);
      setMessage(` ${res.message}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return {
    chocolates,
    userCash,
    loading,
    message,
    setMessage,
    fetchInventory,
    restockChocolate,
    buyChocolate,
    addCash,
  };
};
