import { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("bestsellers");

  return (
    <BookContext.Provider value={{ books, setBooks, searchQuery, setSearchQuery }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
