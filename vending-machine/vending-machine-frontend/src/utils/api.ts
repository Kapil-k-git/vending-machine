import { Chocolate } from "@/types";
import { BASE_URL } from "@/config/apiConfig"; // ✅ Import from config

export const fetchInventoryAPI = async (): Promise<{
  chocolates: Chocolate[];
  userCash: number;
}> => {
  const res = await fetch(`${BASE_URL}/inventory`);
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
};

export const restockChocolateAPI = async (name: string, quantity: number) => {
  const res = await fetch(`${BASE_URL}/restock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chocolateName: name, quantity }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || "Failed to restock.");
  }
  return res.json();
};
export const buyChocolateAPI = async (
  name: string,
  insertedCash: number,
  quantity: number
) => {
  const res = await fetch(`${BASE_URL}/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chocolateName: name, insertedCash, quantity }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Purchase failed.");
  }
  return data;
};

export const addCashAPI = async (amount: number) => {
  const res = await fetch(`${BASE_URL}/add-cash`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || "Failed to add cash.");
  }
  return res.json();
};
