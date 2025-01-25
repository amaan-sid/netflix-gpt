import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="relative">
      <Navbar/>
      {/* Background Image */}
      <div>
        <img
          className="opacity-90 absolute top-0 left-0 "
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7a8c0067-a424-4e04-85f8-9e25a49a86ed/web/IN-en-20250120-TRIFECTA-perspective_860a95da-c386-446e-af83-fef8ddd80803_large.jpg"
          alt=""
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Text */}
      {/* <h1 className="z-50 relative text-9xl text-red-400 text-center grid place-items-center min-h-max">
        abc
      </h1> */}
    </div>
  );
};

export default Home;
