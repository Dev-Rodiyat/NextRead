import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { Footer } from "../components/Footer";

const features = [
    {
        title: "🔍 Smart Recommendations",
        text: "Get personalized suggestions based on genres, trends, and more.",
    },
    {
        title: "📚 Endless Library",
        text: "Explore millions of books through the Google Books database.",
    },
    {
        title: "⚡ Fast & Lightweight",
        text: "Powered by Vite, Tailwind, and React — super smooth experience.",
    },
]

const steps = [
    {
        title: "Step 1",
        subtitle: "Search or Browse",
        text: "Start with a title, genre, or author you're curious about.",
    },
    {
        title: "Step 2",
        subtitle: "Discover Books",
        text: "Explore AI-picked books tailored to your interest.",
    },
    {
        title: "Step 3",
        subtitle: "Start Reading",
        text: "Get previews and start reading or add to your reading list.",
    },
]

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header />

            <section className="text-center py-20 px-6 pt-40 bg-gray-50">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    Discover your next favorite book
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-lg mb-8 max-w-xl mx-auto"
                >
                    Smart recommendations powered by Google Books. Search less, read more.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    <Link
                        to="/explore"
                        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition"
                    >
                        Start Exploring
                    </Link>
                </motion.div>
            </section>

            <section className="py-16 px-6 max-w-6xl mx-auto">
                <h3
                    className="text-3xl font-bold text-center mb-12"
                >
                    Why use NextRead?
                </h3>
                <div className="grid md:grid-cols-3 gap-10 text-center">
                    {features.map((item, index) => (
                        <div
                            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                        >
                            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                            <p className="text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gray-100 py-20 px-6">
                <motion.h3
                    className="text-3xl font-bold text-center mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    How It Works
                </motion.h3>

                <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto text-center">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            className="bg-white p-6 rounded-lg shadow"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                        >
                            <h5 className="text-xl font-semibold mb-1 text-blue-600">
                                {step.title}
                            </h5>
                            <h6 className="text-lg font-medium mb-2">{step.subtitle}</h6>
                            <p className="text-gray-600">{step.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <motion.section
                className="py-20 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h3 className="text-3xl font-bold mb-6">Ready to find your next read?</h3>
                <Link
                    to="/explore"
                    className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition"
                >
                    Explore Now
                </Link>
            </motion.section>

            <Footer />
        </div>
    );
}
