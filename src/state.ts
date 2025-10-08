import { create } from "zustand";

type CartStore = {
  counter: number;
  increment: () => void;
  decrement: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
}));
