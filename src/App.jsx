import React, { useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";
import Popular from "./components/movies/Popular";
import TopRated from "./components/movies/TopRated";
import Upcoming from "./components/movies/Upcoming";
import NowPlaying from "./components/movies/NowPlaying";
import PopularTVShows from "./components/tv_shows/PopularTVShows";
import AiringTodayTVShows from "./components/tv_shows/AiringTodayTVShows";
import OnTVShows from "./components/tv_shows/OnTVShows";
import TopRatedTVShows from "./components/tv_shows/TopRatedTVShows";
import PopularPeople from "./components/people/PopularPeople";
import SearchPage from "./components/Search/SearchPage";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import TvShowsInfo from "./components/TVShowInfo/TvShowInfo";
import PersonBio from "./components/PersonBio/PersonBio";
// random
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-600">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<AuthPage />} />
          <Route path="/movies/popular" element={<Popular/>} />
          <Route path="/movies/now-playing" element={<NowPlaying/>} />
          <Route path="/movies/upcoming" element={<Upcoming/>} />
          <Route path="/movies/top-rated" element={<TopRated/>} />
          <Route path="/tv/popular" element={<PopularTVShows/>} />
          <Route path="/tv/airing-today" element={<AiringTodayTVShows/>} />
          <Route path="/tv/on-tv" element={<OnTVShows/>} />
          <Route path="/tv/top-rated" element={<TopRatedTVShows/>} />
          <Route path="/people/popular" element={<PopularPeople/>} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/movie/:id" element={<MovieInfo/>} />
          <Route path="/tv/:id" element={<TvShowsInfo/>} />
          <Route path="/person/:id" element={<PersonBio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
