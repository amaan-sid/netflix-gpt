import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
const Browse = () => {
  const navigate = useNavigate();

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      // console.log("User signed out successfully");
      navigate("/");
    })
    .catch((error) => {
      console.error("Error signing out:", error.message);
    });
};

  return (
    <div className="flex items-center justify-between px-32 h-28  shadow-md absolute top-0 left-0 z-10 w-full">
      {/* Logo Section */}
      <div className="h-24 w-64">
        <img
          className="h-full w-full object-contain"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
        />
      </div>

      {/* Button Section */}
      <div>
        <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition" onClick={() => handleSignOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Browse