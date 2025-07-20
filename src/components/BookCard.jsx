function BookCard({ book }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col justify-between">
      <img
        src={book.imageLinks?.thumbnail}
        alt={book.title}
        className="w-full h-60 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold">{book.title}</h2>
      <p className="text-sm text-gray-600">{book.authors?.join(", ")}</p>
    </div>
  );
}

export default BookCard;
