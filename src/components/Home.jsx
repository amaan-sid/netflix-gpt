import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Popular from './movies/Popular';
import NowPlaying from './movies/NowPlaying';
import TopRated from './movies/TopRated';
import Upcoming from './movies/Upcoming';
import LatestTrailers from './home_page/LatestTrailers';
import Trending from './home_page/Trending';
import WhatsPopular from './home_page/WhatsPopular';

function Home() {
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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/');
      }
    });

    return () => unsub(); 
  }, [navigate]);

  return  (
    <> 
    <Navbar />
    
    <div className='h-0.5 bg-red-500'></div>

    {/* Welcome div  */}
    <div className="h-60 space-y-8 px-40 bg-gradient-to-r from-[#01baff] via-[#015075] to-[#032541] ">
      <div className='pt-8'>
           <h1 className='text-5xl font-bold '>Welcome.</h1>
           <h2 className='text-3xl font-medium'>Millions of movies, TV shows and people to discover. Explore now. </h2>
      </div>
      <div className='h-12 w-full bg-gray-200 rounded-4xl pl-4 flex justify-between'>
            <input
          type="text"
          placeholder="Search for movies, tv show or person..."
          className="w-full focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
            <button
            onClick={() => handleSearch()}
            //  if (query.trim() === "") return;

            //  navigate(`/search?query=${encodeURIComponent(query)}`);
            className='bg-gradient-to-r from-[#1ed5aa] to-[#03b6df] w-20 rounded-4xl cursor-pointer text-white hover:text-black'> Search</button>
      </div>
      
     
      
       {/* <Popular page={2}/> */}
       {/* <TopRated />
       <Upcoming />
       <NowPlaying /> */}
    </div>

     <div className='px-40 pt-5'> 
       <Trending />
       <LatestTrailers />
       <WhatsPopular />
     </div>
    </>
  )
}

export default Home;
