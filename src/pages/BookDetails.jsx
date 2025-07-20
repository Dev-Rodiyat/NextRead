import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa";

import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { useFavorites } from "../utils/favorites";

export default function BookDetails() {
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
                const data = await res.json();
                setBook(data);
            } catch (err) {
                console.error("Failed to fetch book", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    useEffect(() => {
        if (book?.id) {
            setFavorite(isFavorite(book.id));
        }
    }, [book]);

    const handleFavoriteToggle = () => {
        if (!book) return;
        toggleFavorite(book);
        setFavorite((prev) => !prev);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ClipLoader />
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                Book not found.
            </div>
        );
    }

    const info = book.volumeInfo;

    return (
        <div className="bg-gray-50 text-gray-900 min-h-screen">
            <Header />

            <div className="max-w-5xl mx-auto py-20 pt-32 px-4">
                <Link to="/explore" className="text-blue-600 hover:underline flex pt-2 items-center mb-6">
                    <FaArrowLeft className="mr-2" />
                    Back to Explore
                </Link>

                <div className="flex flex-col md:flex-row gap-10 items-start">
                    <motion.img
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        src={info.imageLinks?.thumbnail || "https://via.placeholder.com/128x193"}
                        alt={info.title}
                        className="w-48 h-auto shadow rounded"
                    />

                    <div>
                        <motion.h1
                            className="text-3xl font-bold mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {info?.title}
                        </motion.h1>

                        {info?.authors && (
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Author(s): </span> {info.authors.join(", ")}</p>
                        )}

                        {info?.categories && (
                            <p className="text-sm text-blue-600 mb-2"><span className="font-semibold">Categories: </span>{info.categories.join(", ")}</p>
                        )}

                        {info?.publishedDate && (
                            <p className="text-sm text-gray-500 mb-1"><span className="font-semibold">Published: </span>{info.publishedDate}</p>
                        )}

                        {info?.pageCount && (
                            <p className="text-sm text-gray-500 mb-4"><span className="font-semibold">Length: </span>{info.pageCount} pages</p>
                        )}

                        <motion.p
                            className="text-gray-800 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            dangerouslySetInnerHTML={{
                                __html: info.description || "No description available.",
                            }}
                        ></motion.p>

                        <div className="space-x-6 mt-6">
                            {info.previewLink && (
                                <a
                                    href={info.previewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Preview on Google Books
                                </a>
                            )}
                            <button
                                onClick={handleFavoriteToggle}
                                className={`px-6 py-2 rounded transition ${favorite
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                {favorite ? "Remove from Favorites" : "Save to Favorites"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 w-full">
                <Footer />
            </div>
        </div>
    );
}
