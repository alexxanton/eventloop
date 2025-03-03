import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  theme: string;
  toggleTheme: () => void;
  userId: string;
  setUserId: (id: string) => void;
  currentGroup: string;
  setCurrentGroup: (group: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      theme: "",
      userId: "",
      currentGroup: "",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
      setUserId: (id: string) => set((state) => ({ ...state, userId: id })),
      setCurrentGroup: (group: string) => set((state) => ({ ...state, currentGroup: group })),
    }),
    {
      name: "theme-storage",
    }
  )
);
