import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  size?: string;
}

export interface CartItem extends Product {
  cartItemId: string; // Unique ID for cart operations (e.g. `${id}-${size}`)
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
        // Generate a unique ID for the cart item based on product ID and size
        const cartItemId = product.size ? `${product.id}-${product.size}` : product.id;
        const existingItem = items.find((item) => item.cartItemId === cartItemId);

        let newItems;
        if (existingItem) {
          newItems = items.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newItems = [...items, { ...product, cartItemId, quantity: 1 }];
        }

        const totalItems = newItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = newItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },
      removeItem: (cartItemId) => {
        const { items } = get();
        const newItems = items.filter((item) => item.cartItemId !== cartItemId);

        const totalItems = newItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = newItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },
      updateQuantity: (cartItemId, quantity) => {
        const { items } = get();
        if (quantity < 1) return;

        const newItems = items.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
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
