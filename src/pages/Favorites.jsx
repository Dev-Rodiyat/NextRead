import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { FaTrash } from "react-icons/fa";
import { useFavorites } from "../utils/favorites";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { getFavorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id) => {
    const bookToRemove = favorites.find((b) => b.id === id);
    if (!bookToRemove) return;

    toggleFavorite(bookToRemove);
    setFavorites((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-20 pt-32">
        <h2 className="text-3xl font-bold mb-6">Your Favorite Books</h2>

        {favorites.length === 0 ? (
          <p className="text-gray-600">No favorites yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {favorites.map((book) => {
              const info = book.volumeInfo;
              return (
                <div key={book.id} className="bg-white p-4 rounded shadow relative">
                  <Link to={`/book/${book.id}`}>
                    <img
                      src={info.imageLinks?.thumbnail || "https://via.placeholder.com/128x193"}
                      alt={info.title}
                      className="mx-auto mb-2"
                    />
                    <h3 className="text-lg font-semibold">{info.title}</h3>
                    <p className="text-sm text-gray-600">
                      {info.authors?.join(", ")}
                    </p>
                  </Link>
                  <button
                    onClick={() => handleRemove(book.id)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
