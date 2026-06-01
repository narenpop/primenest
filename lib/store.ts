import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id: string) =>
        set((state) => ({
          favorites: [...new Set([...state.favorites, id])],
        })),
      removeFavorite: (id: string) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== id),
        })),
      isFavorite: (id: string) => get().favorites.includes(id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
