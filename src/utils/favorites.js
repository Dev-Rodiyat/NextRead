import { useCallback } from "react";

const FAVORITES_KEY = "favoriteBooks";

const getFavorites = () => {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveFavorite = (book) => {
  const favorites = getFavorites();
  if (!favorites.find((b) => b.id === book.id)) {
    favorites.push(book);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

const removeFavorite = (bookId) => {
  const updated = getFavorites().filter((b) => b.id !== bookId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

const isFavorite = (bookId) => {
  return getFavorites().some((b) => b.id === bookId);
};

export const useFavorites = () => {
  const toggleFavorite = useCallback((book) => {
    const currentFavorites = getFavorites();
    const exists = currentFavorites.some((b) => b.id === book.id);

    if (exists) {
      removeFavorite(book.id);
    } else {
      saveFavorite(book);
    }
  }, []);

  return {
    isFavorite,
    toggleFavorite,
    getFavorites
  };
};
