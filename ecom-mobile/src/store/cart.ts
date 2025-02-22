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
  getItemQuantity: (itemId: string) => number;
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
          if (!item) return state;

          if (item.quantity === 1) {
            return {
              items: state.items.filter((i) => i.id !== itemId),
              totalItems: state.totalItems - 1,
            };
          }

          return {
            items: state.items.map((i) =>
              i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            ),
            totalItems: state.totalItems - 1,
          };
        }),

      clearCart: () => set({ items: [], totalItems: 0 }),

      getItemQuantity: (itemId) => {
        const item = get().items.find((i) => i.id === itemId);
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
