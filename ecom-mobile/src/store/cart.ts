import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              totalItems: state.totalItems + 1,
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
            totalItems: state.totalItems + 1,
          };
        }),

      removeItem: (itemId) =>
        set((state) => {
          const item = state.items.find((i) => i.id === itemId);
          return {
            items: state.items.filter((i) => i.id !== itemId),
            totalItems: state.totalItems - (item?.quantity || 0),
          };
        }),

      updateQuantity: (itemId, quantity) =>
        set((state) => {
          const oldItem = state.items.find((i) => i.id === itemId);
          const quantityDiff = quantity - (oldItem?.quantity || 0);

          return {
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
            totalItems: state.totalItems + quantityDiff,
          };
        }),

      clearCart: () => set({ items: [], totalItems: 0 }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCartStore;
