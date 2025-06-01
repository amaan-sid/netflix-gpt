import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "@/utils/constants";
import SearchPage from "./Search/SearchPage";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submission if in a form
      handleSearch();
    }
  };

  const handleSearch = () => {
  if (query.trim() === "") return;

  navigate(`/search?query=${encodeURIComponent(query)}`);
};

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-[rgb(3,37,65)] text-white pl-40 pr-10 py-4 flex justify-between items-center shadow-md">
        <div className="flex gap-8">
          <div className="flex space-x-4">
          <h1 className="text-3xl font-extrabold text-[#19b7d8] tracking-widest">
            {" "}
            TMDB{" "}
          </h1>
          <div className="h-6 mt-2 w-20 rounded-3xl bg-[#19b7d8] "> </div>
          </div>
          <div className="flex gap-8 mt-[2px] ">
            {/* Movies */}
            <div className="relative group">
              <h1 className="text-lg font-bold py-1 cursor-pointer">Movies</h1>

              <div className="absolute left-0 top-full w-40 bg-white text-black shadow-lg rounded hidden group-hover:block z-10">
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/movies/popular")}
                >
                  Popular
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/movies/now-playing")}
                >
                  Now Playing
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                   onClick={() => navigate("/movies/upcoming")}
                >
                  Upcoming
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                   onClick={() => navigate("/movies/top-rated")}
                >
                  Top Rated
                </p>
              </div>
            </div>

            {/* TV Shows */}
            <div className="relative group">
              <h1 className="text-lg font-bold py-1 cursor-pointer">
                TV Shows
              </h1>

              <div className="absolute left-0 top-full w-40 bg-white text-black shadow-lg rounded hidden group-hover:block z-10">
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/tv/popular")}
                >
                  Popular
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/tv/airing-today")}
                >
                  Airing Today
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/tv/on-tv")}
                >
                  On TV
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/tv/top-rated")}
                >
                  Top Rated
                </p>
              </div>
            </div>

            {/* People */}
            <div className="relative group">
              <h1 className="text-lg font-bold py-1 cursor-pointer">People</h1>

              <div className="absolute left-0 top-full w-40 bg-white text-black shadow-lg rounded hidden group-hover:block z-10">
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
                  onClick={() => navigate("/people/popular")}
                >
                  Popular People
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-8 w-8 ">
            <img onClick={() => navigate("/home")} className="filter invert brightness-200 cursor-pointer" src="https://cdn.pixabay.com/photo/2014/04/03/00/41/house-309113_1280.png" alt="" />
          </div>
          <button
            onClick={handleSignOut}
            className="font-bold bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-md cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </nav>
      <div className="bg-red-500 h-[1.5px]"></div>
      {/* Search bar  */}
      <div className="px-40 py-4 flex bg-gray-200 gap-x-1 z-0 ">
        <h3> 🔍 </h3>
        <input
          type="text"
          placeholder="Search for movies, tv show or person..."
          className="w-full focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
}

export default Navbar;
