import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "../Img/medicinal-plant-bg.jpg";
import { API_ROUTES } from "../config/api";

/* ─── Suggestion chips ─── */
const SUGGESTIONS = [
  "Headache", "Common Cold", "Diabetes", "Skin Rashes",
  "Stomach Pain", "Cough & Sore Throat", "Fever",
  "Joint Pain", "Insomnia", "High Blood Pressure",
  "Indigestion", "Anxiety & Stress",
];

/* ─── Video Modal ─── */
const VideoModal = ({ video, onClose }) => {
  if (!video) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white text-xl flex items-center justify-center shadow-lg transition-colors"
        >
          ✕
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${video.video_id}?autoplay=1&rel=0`}
          title={video.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </div>
  );
};

/* ─── Plant Card ─── */
const PlantCard = ({ plant, index, onPlayVideo }) => {
  const [showRecipe, setShowRecipe] = useState(false);

  /* Fallback gradient if no image */
  const gradients = [
    "from-emerald-600 to-teal-700",
    "from-green-600 to-lime-700",
    "from-teal-600 to-cyan-700",
    "from-lime-600 to-emerald-700",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:border-green-400/50 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {plant.image_url ? (
          <img
            src={plant.image_url}
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          />
        ) : null}
        <div
          className={`w-full h-full bg-gradient-to-br ${gradients[index % 4]} flex items-center justify-center text-6xl`}
          style={{ display: plant.image_url ? "none" : "flex" }}
        >
          🌿
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-xl font-bold text-white drop-shadow-lg">{plant.name}</h3>
          {plant.scientific_name && (
            <p className="text-green-300/80 text-xs italic">{plant.scientific_name}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Description */}
        <p className="text-gray-200 text-sm leading-relaxed">{plant.description}</p>

        {/* Properties */}
        <div>
          <h4 className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2">
            Medicinal Properties
          </h4>
          <div className="flex flex-wrap gap-2">
            {plant.medicinal_properties.map((prop, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-xs"
              >
                {prop}
              </span>
            ))}
          </div>
        </div>

        {/* Recipe toggle */}
        <div>
          <button
            onClick={() => setShowRecipe(!showRecipe)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200"
          >
            <span className="text-amber-300 font-semibold text-sm flex items-center gap-2">
              🧪 Medicine Preparation Recipe
            </span>
            <span
              className={`text-white text-lg transition-transform duration-300 ${showRecipe ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>
          <AnimatePresence>
            {showRecipe && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-2 p-4 bg-amber-900/20 rounded-xl border border-amber-500/20">
                  <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line">
                    {plant.recipe}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* YouTube Videos */}
        {plant.videos && plant.videos.length > 0 && (
          <div>
            <h4 className="text-red-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff"/>
              </svg>
              Remedy Videos
            </h4>
            <div className="space-y-3">
              {plant.videos.map((video, i) => (
                <button
                  key={i}
                  onClick={() => onPlayVideo(video)}
                  className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-red-500/10 rounded-xl border border-white/10 hover:border-red-500/30 transition-all duration-200 group/vid text-left"
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 h-16 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover/vid:bg-black/10 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs ml-0.5">▶</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{video.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{video.channel}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Loading Skeleton ─── */
const SkeletonCard = () => (
  <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden animate-pulse">
    <div className="h-52 bg-white/5" />
    <div className="p-5 space-y-4">
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/10 rounded w-full" />
      <div className="h-3 bg-white/10 rounded w-5/6" />
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-white/10 rounded-full" />
        <div className="h-6 w-24 bg-white/10 rounded-full" />
        <div className="h-6 w-16 bg-white/10 rounded-full" />
      </div>
      <div className="h-12 bg-white/5 rounded-xl" />
      <div className="h-16 bg-white/5 rounded-xl" />
    </div>
  </div>
);

/* ─── Main Page ─── */
const RemedyChat = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  const handleSearch = async (searchQuery) => {
    const q = (searchQuery || query).trim();
    if (!q) return;

    setLoading(true);
    setError("");
    setResults(null);
    setQuery(q);

    // Add to search history (keep last 5 unique)
    setSearchHistory((prev) => {
      const updated = [q, ...prev.filter((h) => h.toLowerCase() !== q.toLowerCase())];
      return updated.slice(0, 5);
    });

    try {
      const response = await fetch(API_ROUTES.remedy, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || "Failed to get recommendations");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center pt-20 pb-12 px-4 bg-cover bg-center bg-fixed text-white overflow-x-hidden"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              🌿 Remedy Finder
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Describe your health issue and discover medicinal plants, preparation recipes, and video guides
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-2xl mx-auto mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-2 shadow-2xl focus-within:border-green-400/50 transition-colors">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your health issue... (e.g. headache, diabetes)"
              className="flex-1 w-full h-14 px-4 text-base bg-transparent text-white placeholder-gray-400 outline-none"
              id="remedy-search-input"
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading || !query.trim()}
              className="w-full sm:w-auto px-8 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl text-base transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 disabled:shadow-none flex justify-center items-center gap-2"
              id="remedy-search-button"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Searching...
                </>
              ) : (
                <>🔍 Find Remedies</>
              )}
            </button>
          </div>
        </motion.div>

        {/* Suggestion Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto mb-8"
        >
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                handleSearch(s);
              }}
              disabled={loading}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm border border-white/20 hover:bg-green-500/20 hover:border-green-400/40 hover:scale-105 transition-all duration-200 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* Recent Searches */}
        {searchHistory.length > 0 && !loading && !results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto mb-8 text-center"
          >
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Recent Searches</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {searchHistory.map((h, i) => (
                <button
                  key={i}
                  onClick={() => { setQuery(h); handleSearch(h); }}
                  className="px-3 py-1.5 rounded-full bg-white/5 text-gray-400 text-xs border border-white/10 hover:bg-white/10 hover:text-white transition-all"
                >
                  🕐 {h}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div ref={resultsRef}>
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block text-4xl mb-3"
              >
                🌿
              </motion.div>
              <p className="text-green-400 text-lg font-medium">
                Analyzing your condition & finding medicinal plants...
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Searching remedies, recipes & videos
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-6"
          >
            <p className="text-red-400 text-lg font-medium mb-2">❌ {error}</p>
            <button
              onClick={() => handleSearch()}
              className="mt-2 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl border border-red-500/30 transition-colors text-sm"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Results */}
        {results && !loading && (
          <div ref={resultsRef}>
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">
                Remedies for{" "}
                <span className="text-green-400">"{results.query}"</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Found {results.plants.length} medicinal plant{results.plants.length !== 1 ? "s" : ""} with remedies
              </p>
            </motion.div>

            {/* Plant Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {results.plants.map((plant, i) => (
                <PlantCard
                  key={i}
                  plant={plant}
                  index={i}
                  onPlayVideo={setActiveVideo}
                />
              ))}
            </div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 max-w-2xl mx-auto"
            >
              <p className="text-amber-300/80 text-xs">
                ⚠️ {results.disclaimer}
              </p>
            </motion.div>

            {/* Search Again */}
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setResults(null);
                  setQuery("");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 text-white font-medium transition-all"
              >
                🔍 Search Another Condition
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !results && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <div className="text-6xl mb-4">🌱</div>
            <p className="text-gray-400 text-lg">
              Type a health issue above to discover natural plant remedies
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
              {[
                { icon: "🌿", title: "Plant Recommendations", desc: "Get multiple medicinal plants with images" },
                { icon: "🎥", title: "Video Guides", desc: "Watch preparation videos right here" },
                { icon: "🧪", title: "Recipes", desc: "Step-by-step medicine preparation" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RemedyChat;
