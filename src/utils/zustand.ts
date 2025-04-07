import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GroupType } from "./types/types";

interface StoreState {
  theme: string;
  toggleTheme: () => void;
  userId: string;
  setUserId: (id: string) => void;
  currentGroup: GroupType;
  setCurrentGroup: (group: GroupType) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      theme: "",
      userId: "",
      currentGroup: null,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
      setUserId: (id: string) => set((state) => ({ ...state, userId: id })),
      setCurrentGroup: (group: GroupType) => set((state) => ({ ...state, currentGroup: group })),
    }),
    {
      name: "theme-storage",
    }
  )
);
