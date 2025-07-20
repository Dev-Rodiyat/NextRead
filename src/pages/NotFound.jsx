import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Looks like this book got lost on the shelf...</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
