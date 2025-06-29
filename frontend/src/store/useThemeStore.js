import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("convolink-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("convolink-theme", theme);
    set({ theme })
  },
}))