import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/models/ProductModel";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (itemId: string) => void;
  getItemQuantity: (itemId: string) => number;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          const newTotalItems = state.totalItems + 1;
          const newTotalPrice = state.totalPrice + Number(item.price);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              totalItems: newTotalItems,
              totalPrice: Math.max(0, newTotalPrice),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
            totalItems: newTotalItems,
            totalPrice: Math.max(0, newTotalPrice),
          };
        }),

      removeItem: (itemId) =>
        set((state) => {
          const item = state.items.find((i) => i.id === Number(itemId));
          if (!item) return state;

          const newTotalItems = Math.max(0, state.totalItems - 1);
          const newTotalPrice = Math.max(
            0,
            state.totalPrice - Number(item.price)
          );

          if (item.quantity === 1) {
            return {
              items: state.items.filter((i) => i.id !== Number(itemId)),
              totalItems: newTotalItems,
              totalPrice: newTotalPrice,
            };
          }

          return {
            items: state.items.map((i) =>
              i.id === Number(itemId) ? { ...i, quantity: i.quantity - 1 } : i
            ),
            totalItems: newTotalItems,
            totalPrice: newTotalPrice,
          };
        }),

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),

      getItemQuantity: (itemId) => {
        const item = get().items.find((i) => i.id === Number(itemId));
        return item?.quantity || 0;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCartStore;
