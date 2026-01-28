import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Landing.css";

export default function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 via-purple-50 to-indigo-50 flex flex-col relative overflow-hidden">
      {/* Beautiful Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Multiple beautiful gradient orbs */}
        <div 
          className="absolute w-[700px] h-[700px] bg-gradient-to-r from-rose-300/40 via-pink-300/35 to-purple-300/30 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x * 0.012}px`,
            top: `${mousePosition.y * 0.012}px`,
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-300/25 via-indigo-300/20 to-blue-300/15 rounded-full blur-2xl"
          style={{
            right: `${mousePosition.x * 0.018}px`,
            bottom: `${mousePosition.y * 0.018}px`,
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-300/20 via-blue-300/15 to-cyan-300/10 rounded-full blur-xl"
          style={{
            left: `${mousePosition.x * 0.025}px`,
            top: `${mousePosition.y * 0.025}px`,
            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        {/* Beautiful floating particles */}
        <div 
          className="absolute top-20 left-10 w-2 h-2 bg-rose-400 rounded-full animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.08}px) scale(${1 + Math.sin(Date.now() * 0.001) * 0.2})`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute top-32 right-20 w-3 h-3 bg-purple-400 rounded-full animate-ping"
          style={{
            transform: `translateY(${scrollY * 0.12}px) scale(${1 + Math.cos(Date.now() * 0.001) * 0.2})`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute bottom-40 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.06}px) scale(${1 + Math.sin(Date.now() * 0.0015) * 0.2})`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute bottom-20 right-30 w-4 h-4 bg-cyan-400 rounded-full animate-bounce"
          style={{
            transform: `translateY(${scrollY * 0.10}px) scale(${1 + Math.cos(Date.now() * 0.0015) * 0.2})`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        {/* Beautiful decorative elements */}
        <div className="absolute top-40 left-1/4 w-1 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-pulse" />
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-ping" />
        <div className="absolute bottom-60 left-1/3 w-1 h-1 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full animate-pulse" />
        <div className="absolute bottom-40 right-1/4 w-1 h-1 bg-gradient-to-r from-cyan-400 to-rose-400 rounded-full animate-bounce" />
        {/* Beautiful grid pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="h-full w-full bg-beautiful-grid-pattern" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className={`w-full max-w-8xl flex flex-col items-center justify-center transition-all duration-2500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-40 opacity-0'}`}>
          {/* Beautiful Logo Section */}
          <div className="mb-20 relative group">
            <div className="relative inline-flex items-center justify-center w-40 h-40 bg-gradient-to-br from-rose-400 via-pink-500 via-purple-500 to-indigo-500 rounded-4xl shadow-4xl overflow-hidden backdrop-blur-sm">
              <span className="text-7xl animate-bounce filter-beautiful-drop-shadow">🛍️</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -inset-3 bg-gradient-to-br from-rose-400/30 to-purple-400/20 rounded-4xl blur-3xl animate-pulse" />
            </div>
            <div className="absolute -inset-10 bg-gradient-to-br from-rose-300/15 to-purple-300/10 rounded-4xl blur-4xl animate-beautiful-spin" />
            <div className="absolute -inset-20 bg-gradient-to-br from-pink-200/10 to-indigo-200/5 rounded-4xl blur-5xl animate-beautiful-pulse" />
          </div>
          
          {/* Beautiful Title Section */}
          <div className="mb-16 text-center">
            <h1 className="text-8xl md:text-10xl font-black mb-8 tracking-tight leading-none">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-beautiful-gradient-shimmer filter-beautiful-drop-shadow">Shop</span>
                <span className="text-gray-800">'Again</span>
              </span>
            </h1>
            <p className="text-3xl md:text-4xl text-gray-600 font-light max-w-5xl mx-auto leading-relaxed mb-6">
              Your smart shopping list companion that makes organizing effortless
            </p>
            <p className="text-xl text-gray-500 max-w-4xl mx-auto animate-beautiful-fade-in-delay">
              Powered by AI • Real-time sync • Smart reminders • Beautiful design
            </p>
          </div>
          
          {/* Beautiful Features Grid */}
          <div className="grid md:grid-cols-3 gap-12 mb-24 w-full max-w-7xl">
            <div 
              className={`group relative bg-white/95 backdrop-blur-xl rounded-4xl p-12 border border-white/70 shadow-3xl hover:shadow-5xl transition-all duration-800 hover:-translate-y-6 hover:scale-105 ${activeCard === 1 ? 'ring-4 ring-rose-200' : ''}`}
              onMouseEnter={() => setActiveCard(1)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-rose-400/15 to-purple-400/10 rounded-4xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-800" />
              <div className="text-6xl mb-8 group-hover:rotate-12 transition-transform duration-600 text-center">📝</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Smart Lists</h3>
              <p className="text-gray-600 leading-relaxed text-center mb-6 text-lg">Create organized shopping lists with AI-powered suggestions and beautiful design</p>
              <div className="flex justify-center">
                <span className="text-sm bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-4 py-2 rounded-full font-semibold border border-rose-200">AI Enhanced</span>
              </div>
            </div>
            <div 
              className={`group relative bg-white/95 backdrop-blur-xl rounded-4xl p-12 border border-white/70 shadow-3xl hover:shadow-5xl transition-all duration-800 hover:-translate-y-6 hover:scale-105 delay-200 ${activeCard === 2 ? 'ring-4 ring-purple-200' : ''}`}
              onMouseEnter={() => setActiveCard(2)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-400/15 to-indigo-400/10 rounded-4xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-800" />
              <div className="text-6xl mb-8 group-hover:rotate-12 transition-transform duration-600 text-center">👥</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Share & Sync</h3>
              <p className="text-gray-600 leading-relaxed text-center mb-6 text-lg">Collaborate with family in real-time across all your devices</p>
              <div className="flex justify-center">
                <span className="text-sm bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-4 py-2 rounded-full font-semibold border border-purple-200">Real-time</span>
              </div>
            </div>
            <div 
              className={`group relative bg-white/95 backdrop-blur-xl rounded-4xl p-12 border border-white/70 shadow-3xl hover:shadow-5xl transition-all duration-800 hover:-translate-y-6 hover:scale-105 delay-400 ${activeCard === 3 ? 'ring-4 ring-indigo-200' : ''}`}
              onMouseEnter={() => setActiveCard(3)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-indigo-400/15 to-cyan-400/10 rounded-4xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-800" />
              <div className="text-6xl mb-8 group-hover:rotate-12 transition-transform duration-600 text-center">🔔</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Smart Reminders</h3>
              <p className="text-gray-600 leading-relaxed text-center mb-6 text-lg">Never forget an item with intelligent notifications</p>
              <div className="flex justify-center">
                <span className="text-sm bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full font-semibold border border-indigo-200">Smart Alerts</span>
              </div>
            </div>
          </div>
          
          {/* Beautiful CTA Section */}
          <div className="flex flex-col items-center gap-12 mb-20">
            <div className="relative group">
              <Link
                to="/registration"
                className="relative bg-gradient-to-r from-rose-500 via-pink-500 via-purple-500 to-indigo-500 text-white px-16 py-8 rounded-4xl font-bold text-2xl hover:shadow-5xl transition-all duration-800 hover:-translate-y-4 hover:scale-105 overflow-hidden min-w-[320px]"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="relative z-10 flex items-center justify-center gap-6">
                  Get Started 
                  <span className={`transition-transform duration-400 inline-block ${isHovering ? 'translate-x-4' : ''}`}>→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-800" />
                <div className="absolute inset-0 bg-white/25 rounded-4xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-800" />
              </Link>
              <div className="absolute -inset-3 bg-gradient-to-br from-rose-400/25 to-purple-400/15 rounded-4xl blur-3xl animate-beautiful-pulse" />
              <div className="absolute -inset-6 bg-gradient-to-br from-pink-300/15 to-indigo-300/10 rounded-4xl blur-4xl animate-beautiful-spin" />
            </div>
            <div className="text-center animate-beautiful-fade-in-delay-200">
              <p className="text-base text-gray-500 mb-6">or</p>
              <Link
                to="/login"
                className="group bg-white text-gray-700 px-16 py-8 rounded-4xl font-bold text-2xl border-2 border-gray-200 hover:border-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-800 hover:shadow-5xl hover:-translate-y-4 hover:scale-105 min-w-[320px]"
              >
                Sign In
              </Link>
            </div>
          </div>
          
          {/* Beautiful Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-12 text-base text-gray-500">
            <div className="group relative flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 rounded-full border border-rose-200 hover:border-rose-400 hover:shadow-2xl transition-all duration-600">
              <span className="text-rose-600 font-bold text-xl">✓</span>
              <span className="font-medium text-rose-700">Free Forever</span>
              <div className="absolute -inset-2 bg-gradient-to-br from-rose-400/15 to-purple-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-600" />
            </div>
            <div className="group relative flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-full border border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all duration-600 delay-150">
              <span className="text-purple-600 font-bold text-xl">✓</span>
              <span className="font-medium text-purple-700">No Credit Card</span>
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-400/15 to-indigo-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-600" />
            </div>
            <div className="group relative flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-indigo-50 via-cyan-50 to-rose-50 rounded-full border border-indigo-200 hover:border-indigo-400 hover:shadow-2xl transition-all duration-600 delay-300">
              <span className="text-indigo-600 font-bold text-xl">✓</span>
              <span className="font-medium text-indigo-700">10K+ Users</span>
              <div className="absolute -inset-2 bg-gradient-to-br from-indigo-400/15 to-cyan-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-600" />
            </div>
          </div>
        </div>
      </main>
      
      {/* Beautiful Footer */}
      <footer className="py-12 px-6 border-t border-gray-200/50 relative z-10">
        <div className="text-center text-gray-500">
          <p className="text-base mb-4">© 2024 Shop'Again. Built with <span className="text-rose-500 animate-beautiful-heart-pulse">❤️</span> using beautiful technology</p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <span className="hover:text-rose-500 transition-colors duration-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-purple-500 transition-colors duration-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-indigo-500 transition-colors duration-300 cursor-pointer">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
