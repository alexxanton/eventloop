import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Group } from "./types/types";

interface StoreState {
  theme: string;
  toggleTheme: () => void;
  userId: string;
  setUserId: (id: string) => void;
  userUrl: string;
  setUserUrl: (id: string) => void;
  currentGroup: Group;
  setCurrentGroup: (group: Group) => void;
  menuOpen: boolean;
  setMenuOpen: (bool: boolean) => void;
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
      menuOpen: true,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
      setUserId: (id: string) => set((state) => ({ ...state, userId: id })),
      setUserUrl: (id: string) => set((state) => ({ ...state, userUrl: id })),
      setCurrentGroup: (group: Group) => set((state) => ({ ...state, currentGroup: group })),
      setMenuOpen: (bool: boolean) => set((state) => ({ ...state, menuOpen: bool })),
      toggleOpenEvents: () =>
        set((state) => ({
          openEvents: !state.openEvents,
        })),
    }),
    {
      name: "theme-storage",
    }
  ),
);
