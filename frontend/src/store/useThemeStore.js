import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { updateUserTheme } from '../lib/api';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'autumn', // Default to autumn
      setTheme: async (theme) => {
        set({ theme });
        try {
          await updateUserTheme(theme); // Sync with backend
        } catch (error) {
          console.error('Error updating theme:', error);
        }
      },
    }),
    { name: 'convolink-theme' }
  )
);