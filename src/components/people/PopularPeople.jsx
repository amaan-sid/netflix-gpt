import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { API_KEY } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const PopularPeople = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPopularPeople = async () => {
      setIsLoading(true);
      setFadeIn(false);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${page}`
        );
        const data = await res.json();
        setPeople(data.results || []);
        setTimeout(() => setFadeIn(true), 50);
      } catch (error) {
        console.error("Error fetching popular people:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularPeople();
  }, [page]);

  return (
    <>
      <Navbar />
      <div className="px-40 text-white">
        <h2 className="text-3xl font-bold my-6">Popular People</h2>

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 transition-opacity duration-500 ease-in-out ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {people.map((person) => (
            <div
              key={person.id}
              className="bg-gray-800 cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={person.name}
                className="w-full h-auto"
                onClick={() => navigate(`/person/${person.id}`)}
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold text-center">{person.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
          
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1 || isLoading}
            className="bg-gray-600 cursor-pointer hover:bg-gray-700 text-white px-4 py-2 rounded-full font-semibold disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isLoading}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Page Number Display */}
        <p  className="text-center mt-2 text-gray-400">Page {page}</p>
      </div>
    </>
  );
};

export default PopularPeople;
