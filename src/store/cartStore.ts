import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IMeal } from "@/types";

interface CartItem extends IMeal {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (meal: IMeal) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (meal) => {
        console.log("Adding to cart:", meal.name);
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === meal.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === meal.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ items: [...currentItems, { ...meal, quantity: 1 }] });
        }
      },
      removeFromCart: (id) =>
        set({ items: get().items.filter((item) => item.id !== id) }),
      clearCart: () => set({ items: [] }),
      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    { name: "cart-storage" },
  ),
);
