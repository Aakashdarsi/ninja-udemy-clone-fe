import { create } from "zustand";

type UserState = {
  loggedIn: boolean;
  userName?: string;
  userId?: string;
};

type UserActions = {
  setUser(userId: string, userName: string): void;
  getUser(): UserState;
  logOutUser(): void;
};

type UserDetails = UserState & UserActions;

export const useUserDetails = create<UserDetails>((set, get) => ({
  loggedIn: false,
  userName: "",
  userId: "",
  setUser: (userId, userName) =>
    set({ loggedIn: true, userId: userId, userName: userName }),
  getUser: () => {
    const { loggedIn, userName, userId } = get();
    return { loggedIn, userName, userId };
  },
  logOutUser: () => set(() => ({ loggedIn: false })),
}));
