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

interface CheckoutState {
  address: AddressFormData;
  setAddress: (address: Partial<AddressFormData>) => void;
}

const useCheckoutStore = create<CheckoutState>((set) => ({
  address: {
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
  },
  setAddress: (newAddress) =>
    set((state) => ({ address: { ...state.address, ...newAddress } })),
}));

export default useCheckoutStore;
