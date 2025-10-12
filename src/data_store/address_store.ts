import { create } from "zustand";

export interface AddressFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  addressType: "home" | "work" | "other";
  saveAddress: boolean;
}

interface AddressState {
  address: AddressFormData;
  setFormField: <K extends keyof AddressFormData>(
    field: K,
    value: AddressFormData[K],
  ) => void;
  setAddress: (data: Partial<AddressFormData>) => void;
  resetAddress: () => void;
}

const initialState: AddressFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "United States",
  addressType: "home",
  saveAddress: false,
};

export const useAddressStore = create<AddressState>((set) => ({
  address: initialState,
  setFormField: (field, value) =>
    set((state) => ({ address: { ...state.address, [field]: value } })),
  setAddress: (data) =>
    set((state) => ({ address: { ...state.address, ...data } })),
  resetAddress: () => set({ address: initialState }),
}));
