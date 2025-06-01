import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../Navbar";
import { API_KEY, default_pic_movie } from "@/utils/constants";
import { default_pic_men } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [personResults, setPersonResults] = useState([]);
  const [activeTab, setActiveTab] = useState("movie"); // movie | tv | person
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    const fetchAll = async () => {
      try {
        const [movieRes, tvRes, personRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              query
            )}&page=${page}&api_key=${API_KEY}`
          ),
          fetch(
            `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
              query
            )}&page=${page}&api_key=${API_KEY}`
          ),
          fetch(
            `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
              query
            )}&page=${page}&api_key=${API_KEY}`
          ),
        ]);

        const [movieData, tvData, personData] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
          personRes.json(),
        ]);

        setMovieResults(movieData.results || []);
        setTvResults(tvData.results || []);
        setPersonResults(personData.results || []);

        if (activeTab === "movie") setTotalPages(movieData.total_pages || 1);
        if (activeTab === "tv") setTotalPages(tvData.total_pages || 1);
        if (activeTab === "person") setTotalPages(personData.total_pages || 1);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    fetchAll();
  }, [query, page]);

  const getActiveResults = () => {
    if (activeTab === "movie") return movieResults;
    if (activeTab === "tv") return tvResults;
    if (activeTab === "person") return personResults;
    return [];
  };

  const handleTabChange = (type) => {
    setActiveTab(type);
    setPage(1); // reset to first page on tab change
  };

  return (
    <>
      <Navbar />
      <div className="flex px-40 py-6">
        {/* Sidebar */}
        <div className="w-64 mr-8">
          <div className="bg-white rounded-xl shadow space-y-2">
            <div className="bg-primary rounded-t-xl p-4 mb-4 ">
              <h1 className="text-white font-bold text-xl">Search Results</h1>
            </div>

            {["movie", "tv", "person"].map((type) => (
              <button
                key={type}
                className={`w-full px-4 flex items-start py-2 rounded cursor-pointer ${
                  activeTab === type
                    ? "bg-gray-200 text-black font-bold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange(type)}
              >
                {type === "movie" && "Movies"}
                {type === "tv" && "TV Shows"}
                {type === "person" && "People"}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-6">
            {getActiveResults().map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-lg shadow">
                {activeTab !== "person" ? (
                  <>
                    <img
                      onClick={() =>
                        navigate(
                          activeTab === "movie"
                            ? `/movie/${item.id}`
                            : activeTab === "tv"
                            ? `/tv/${item.id}`
                            : "#"
                        )
                      }
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                          : `${default_pic_movie}`
                      }
                      alt={item.title || item.name}
                      className="w-full rounded-t-lg h-64 object-cover mb-2 cursor-pointer"
                    />
                    <h2
                      onClick={() =>
                        navigate(
                          activeTab === "movie"
                            ? `/movie/${item.id}`
                            : activeTab === "tv"
                            ? `/tv/${item.id}`
                            : "#"
                        )
                      }
                      className="text-white px-2 text-lg font-semibold hover:text-blue-600 cursor-pointer"
                    >
                      {item.title || item.name}
                    </h2>
                    <span className="text-white px-2 text-center text-sm">
                      {item.release_date?.slice(0, 4) ||
                        item.first_air_date?.slice(0, 4) ||
                        "N/A"}
                    </span>
                  </>
                ) : (
                  <>
                    <img
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                          : `${default_pic_men}`
                      }
                      alt={item.name}
                      className="w-full rounded-t-lg h-64 object-cover mb-2 cursor-pointer"
                      onClick={() => navigate(`/person/${item.id}`)}
                    />
                    <h2 className="text-lg text-white px-2 font-semibold cursor-pointer hover:text-blue-500">
                      {item.name}
                    </h2>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
