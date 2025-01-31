import React from 'react';
import { netflix_logo } from '../utils/constants';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-32 h-28  shadow-md absolute top-0 left-0 z-10 w-full">
      {/* Logo Section */}
      <div className="h-24 w-64 bg-black/5">
        <img
          className="h-full w-full object-contain"
          src= {netflix_logo}
          alt="Netflix Logo"
        />
      </div>

      {/* Button Section */}
      {/* <div>
        <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition">
          Sign In
        </button>
      </div> */}
    </div>
  );
};

export default Navbar;
