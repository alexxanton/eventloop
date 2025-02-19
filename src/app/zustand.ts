import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  theme: string;
  toggleTheme: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (toggleTheme) => ({
      theme: "",
      toggleTheme: () =>
        toggleTheme((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-storage",
    }
  )
);
