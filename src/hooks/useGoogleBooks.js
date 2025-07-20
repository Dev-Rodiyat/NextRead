import { useState, useEffect } from "react";

export const useGoogleBooks = (query, defaultQuery = "popular books") => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const search = query.trim() !== "" ? query : defaultQuery;

    const fetchBooks = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}`);
        const data = await res.json();
        setBooks(data.items || []);
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, defaultQuery]);

  return { books, loading, error };
};
