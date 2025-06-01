import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "@/utils/constants";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const PersonBio = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        setLoading(true);

        const [personRes, creditsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}`)
        ]);

        const personData = await personRes.json();
        const creditsData = await creditsRes.json();

        setPerson(personData);
        setCredits(creditsData.cast || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch person bio:", err);
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (!person) return <div className="text-white p-4">Person not found.</div>;

  return (
    <> 
    <Navbar/>
    <div className="px-40 py-10 text-white">
      <div className="flex flex-col md:flex-row gap-6">
  <div>
    <img
      src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
      alt={person.name}
      className="rounded-lg max-w-96 object-cover h-120"
    />
    <div className="mt-4 text-gray-400 text-sm space-y-1">
      <p><strong>Date of Birth:</strong> {person.birthday || "N/A"}</p>
      <p><strong>Gender:</strong> {person.gender === 1 ? "Female" : person.gender === 2 ? "Male" : "Not specified"}</p>
      <p><strong>Place of Birth:</strong> {person.place_of_birth || "N/A"}</p>
    </div>
  </div>

  <div>
    <h1 className="text-3xl font-bold mb-2">{person.name}</h1>
    <p className="text-sm text-gray-400 mb-4">
      {person.known_for_department}
    </p>
    {person.biography ? (
      <p className="leading-relaxed max-w-3xl">{person.biography}</p>
    ) : (
      <p className="text-gray-400">No biography available.</p>
    )}
  </div>
</div>


      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Known For</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {credits
            .filter((item) => item.poster_path)
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 12)
            .map((item) => (
              <div
                key={item.id}
                className="min-w-[150px] hover:scale-105 transition-transform cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  alt={item.title || item.name}
                  className="rounded w-full"
                  onClick={() => navigate(item.media_type === 'movie' ? `/movie/${item.id}` :
                     `/tv/${item.id}`
                  )}
                />
                <p className="mt-1 text-sm font-medium truncate text-center">
                  {item.title || item.name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default PersonBio;
