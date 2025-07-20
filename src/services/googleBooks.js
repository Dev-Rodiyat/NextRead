const API_BASE = "https://www.googleapis.com/books/v1/volumes";

export const fetchBooks = async (query) => {
  const res = await fetch(`${API_BASE}?q=${query}`);
  if (!res.ok) throw new Error("Failed to fetch books");
  const data = await res.json();
  console.log({data})
  return data.items || [];
};

fetchBooks()