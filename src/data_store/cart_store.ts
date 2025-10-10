import { create } from "zustand";
import type { cartProdProps } from "../interfaces/index";
type cartStore = {
  items: cartProdProps[];
  buyItems: boolean;
  clearCart: boolean;
  overallQty: number;
  incrementQty(): void;
  decrementQty(): void;
};

export const useCartStore = create<cartStore>((set) => ({
  overallQty: 3,
  items: [],
  buyItems: true,
  clearCart: true,
  incrementQty: () => set((state) => ({ overallQty: state.overallQty + 1 })),
  decrementQty: () => set((state) => ({ overallQty: state.overallQty - 1 })),
}));
