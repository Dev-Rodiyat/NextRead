import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { FaRegStar, FaSearch, FaTimes } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { useGoogleBooks } from "../hooks/useGoogleBooks";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useFavorites } from "../utils/favorites";

export const categories = [
  "Fiction",
  "Non-fiction",
  "Technology",
  "Self-Help",
  "History",
  "Science",
  "Fantasy",
  "Business",
  "Health",
];

export default function Explore() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("Fiction");
  const [favoritesUpdated, setFavoritesUpdated] = useState(false);

  const activeSearch = query.trim() || genre;

  const { books, loading, error } = useGoogleBooks(activeSearch);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleCategoryClick = (cat) => {
    setGenre(cat);
    setQuery("");
  };

  const handleSearch = (e) => e.preventDefault();

  const handleToggleFavorite = (book) => {
    toggleFavorite(book);
    setFavoritesUpdated((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <section className="pb-4 px-6 max-w-5xl pt-40 mx-auto text-center">
        <motion.h2
          className="md:text-4xl text-2xl sm:text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Books
        </motion.h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base md:text-lg lg:text-xl">
          Search by title, author, or genre to find your next great read.
        </p>
        <form onSubmit={handleSearch} className="flex justify-center mb-8">
          <div className="relative w-full max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </form>
      </section>

      <div className="flex overflow-x-auto gap-3 mb-12 px-4 scrollbar-hide lg:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full min-w-[120px] text-xs md:text-sm font-medium border transition-all duration-200 transform hover:scale-105 ${
              cat === genre
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center my-10">
          <ClipLoader size={40} color="#3b82f6" />
        </div>
      )}

      {error && toast.error(error)}

      <section className="pb-24 px-6 max-w-6xl mx-auto">
        <motion.h3
          className="md:text-2xl sm:text-xl text-lg font-semibold mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Recommended for you
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6">
          {books.map((book) => {
            const info = book.volumeInfo;
            const fav = isFavorite(book.id);

            return (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="bg-white shadow p-4 rounded-lg flex flex-col justify-between"
              >
                <img
                  src={
                    info.imageLinks?.thumbnail ||
                    "https://via.placeholder.com/128x193"
                  }
                  alt={info.title}
                  className="mx-auto mb-3"
                />
                <h2 className="md:text-lg sm:text-base text-sm font-semibold">
                  {info.title}
                </h2>
                <p className="text-sm text-gray-600 pt-2">
                  <span className="font-semibold">Author:</span>{" "}
                  {info.authors?.join(", ")}
                </p>
                <p className="text-sm text-gray-600 pt-1">
                  <span className="font-semibold">Categories:</span>{" "}
                  {info.categories?.join(", ")}
                </p>
                <p className="text-sm text-gray-600 pt-1">
                  <span className="font-semibold">Published:</span>{" "}
                  {info.publishedDate}
                </p>

                <div className="mt-4 self-end">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleFavorite(book);
                    }}
                    className={`mt-4 px-6 py-2 rounded transition flex gap-2 ${
                      fav
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {fav ? <GoTrash /> : <FaRegStar />}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
