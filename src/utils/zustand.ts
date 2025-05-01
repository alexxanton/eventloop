import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GroupType } from "./types/types";

interface StoreState {
  theme: string;
  toggleTheme: () => void;
  userId: string;
  setUserId: (id: string) => void;
  userUrl: string;
  setUserUrl: (id: string) => void;
  currentGroup: GroupType;
  setCurrentGroup: (group: GroupType) => void;
  openEvents: boolean;
  toggleOpenEvents: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      theme: "",
      userId: "",
      userUrl: "",
      currentGroup: null,
      openEvents: false,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
      setUserId: (id: string) => set((state) => ({ ...state, userId: id })),
      setUserUrl: (id: string) => set((state) => ({ ...state, userUrl: id })),
      setCurrentGroup: (group: GroupType) => set((state) => ({ ...state, currentGroup: group })),
      toggleOpenEvents: () =>
        set((state) => ({
          openEvents: !state.openEvents,
        })),
    }),
    {
      name: "theme-storage",
    }
  )
);
