import { create } from "zustand";

type CartStore = {
  counter: number;
  increment: () => void;
  decrement: () => void;
};

type CartAction = {
  clicked: boolean;
  close: () => void;
  open: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
}));

export const useCartAction = create<CartAction>((set) => ({
  clicked: false,
  open: () => set(() => ({ clicked: true })),
  close: () => set(() => ({ clicked: false })),
}));
