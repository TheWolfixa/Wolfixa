import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      totalItems: 0,
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        let newItems;
        if (existingItem) {
          newItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newItems = [...items, { ...product, quantity: 1 }];
        }

        const totalItems = newItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = newItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },
      removeItem: (id) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== id);

        const totalItems = newItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = newItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },
      updateQuantity: (id, quantity) => {
        const { items } = get();
        if (quantity < 1) return;

        const newItems = items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );

        const totalItems = newItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = newItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'wolfixa-cart', // name of item in the storage (must be unique)
    }
  )
);
