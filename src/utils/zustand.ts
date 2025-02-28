import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  theme: string;
  toggleTheme: () => void;
  userId: string;
  setUserId: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      theme: "",
      userId: "",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
      setUserId: (id: string) => set((state) => ({ ...state, userId: id })),
    }),
    {
      name: "theme-storage",
    }
  )
);
