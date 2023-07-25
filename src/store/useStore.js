import { create } from "zustand";

const useStore = create((set) => ({
  loggedInEmail: "",
  userData: {},
  setLoggedInEmail: (email) => set({ loggedInEmail: email }),
  setUserData: (data) => set({ userData: data }),
}));

export default useStore;
