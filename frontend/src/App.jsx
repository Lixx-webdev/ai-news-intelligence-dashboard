import { useEffect, useState } from "react";
import API from "./api";

function App() {

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // FETCH ARTICLES
  const fetchArticles = async () => {

    try {

      setLoading(true);

      const response = await API.get("/articles?limit=15");

      setArticles(response.data);

    } catch (error) {

      console.log("ERROR:", error);

    } finally {

      setLoading(false);

    }
  };

  // SEARCH ARTICLES
  const searchArticles = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        `/search?query=${search}`
      );

      setArticles(response.data);

    } catch (error) {

      console.log("SEARCH ERROR:", error);

    } finally {

      setLoading(false);

    }
  };

  // LOAD ARTICLES ON START
  useEffect(() => {

    const loadArticles = async () => {

      await fetchArticles();

    };

    loadArticles();

  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white overflow-x-hidden">

      {/* HERO SECTION */}

      <div className="relative overflow-hidden border-b border-white/10">

        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">

          <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
            <span className="text-sm tracking-wide text-cyan-300 font-medium">
              AI + Data Science Internship Project
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            AI News
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Intelligence Dashboard
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
            Real-time AI-powered news analysis platform built using FastAPI,
            React, ETL pipelines, SQLite, and AI enrichment workflows.
          </p>

          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
              <p className="text-gray-300 text-sm mb-2">Articles Loaded</p>
              <h2 className="text-4xl font-bold text-cyan-400">
                {articles.length}
              </h2>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
              <p className="text-gray-300 text-sm mb-2">AI Pipeline</p>
              <h2 className="text-2xl font-bold text-emerald-400">
                Active
              </h2>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
              <p className="text-gray-300 text-sm mb-2">Backend Status</p>
              <h2 className="text-2xl font-bold text-purple-400">
                Connected
              </h2>
            </div>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* SEARCH SECTION */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-12 shadow-2xl">

          <div className="flex flex-col lg:flex-row gap-4">

            <input
              type="text"
              placeholder="Search AI, technology, startups, business news..."
              className="flex-1 bg-black/20 border border-white/10 text-white p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={searchArticles}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition shadow-xl"
            >
              Search
            </button>

            <button
              onClick={fetchArticles}
              className="bg-white/10 border border-white/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition"
            >
              Refresh
            </button>

          </div>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="flex justify-center items-center py-20">

            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

          </div>

        )}

        {/* EMPTY STATE */}

        {!loading && articles.length === 0 && (

          <div className="bg-white/10 border border-white/10 rounded-3xl p-12 text-center">

            <h2 className="text-3xl font-bold mb-4">
              No Articles Found
            </h2>

            <p className="text-gray-300">
              Try searching for another keyword.
            </p>

          </div>

        )}

        {/* ARTICLES GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {articles.map((article) => (

            <div
              key={article.id}
              className="group relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] hover:border-cyan-400/40 transition duration-300"
            >

              {/* TOP GLOW */}

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>

              <div className="p-7 flex flex-col h-full">

                {/* SOURCE */}

                <div className="flex justify-between items-center mb-5">

                  <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-400/20">
                    {article.source_name || "News Source"}
                  </span>

                  <span className="text-sm text-gray-400">
                    {article.pubDate
                      ? article.pubDate.slice(0, 10)
                      : "N/A"}
                  </span>

                </div>

                {/* TITLE */}

                <h2 className="text-2xl font-bold leading-snug mb-4 text-white group-hover:text-cyan-300 transition">
                  {article.title}
                </h2>

                {/* DESCRIPTION */}

                <p className="text-gray-300 leading-relaxed mb-6 line-clamp-4">
                  {article.description}
                </p>

                {/* AI ANALYSIS */}

                <div className="bg-black/20 border border-white/10 rounded-2xl p-5 mb-6 flex-1">

                  <div className="flex items-center gap-2 mb-3">

                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>

                    <h3 className="font-bold text-lg text-emerald-300">
                      AI Analysis
                    </h3>

                  </div>

                  <p className="text-sm text-gray-200 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto pr-2">
                    {article.summary || "AI analysis unavailable."}
                  </p>

                </div>

                {/* BUTTON */}

                <a
                  href={article.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-center py-4 rounded-2xl font-bold hover:opacity-90 transition shadow-lg"
                >
                  Read Full Article
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default App;