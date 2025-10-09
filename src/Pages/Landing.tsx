import { Link } from "react-router-dom";
import "../Landing.css";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="mb-12">
          <h1 className="text-7xl font-bold text-gray-900 mb-6">
            🛍️ Shop'Again
          </h1>
          <p className="text-3xl text-gray-600 mb-12">
            Your Smart Shopping List Companion
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center">
          <Link
            to="/registration"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-5 rounded-lg text-xl shadow-lg transition transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-50 text-blue-600 font-semibold px-12 py-5 rounded-lg text-xl shadow-lg border-2 border-blue-600 transition transform hover:scale-105"
          >
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
}
