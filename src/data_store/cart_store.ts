import { create } from "zustand";
import type { cartProdProps } from "../interfaces/index";
type cartStore = {
  items: cartProdProps[];
  buyItems: boolean;
  clearCart: boolean;
  overallQty: number;
  incrementQty(): void;
  decrementQty(): void;
  setCartQty(qty: number): void;
  addItemsCart(items: cartProdProps[]): void;
};

export const useCartStore = create<cartStore>((set) => ({
  overallQty: 0,
  items: [],
  buyItems: true,
  clearCart: true,
  incrementQty: () => set((state) => ({ overallQty: state.overallQty + 1 })),
  decrementQty: () => set((state) => ({ overallQty: state.overallQty - 1 })),
  setCartQty: (qty) => set(() => ({ overallQty: qty })),
  addItemsCart: (items) =>
    set((state) => ({ items: [...state.items, ...items] })),
}));
