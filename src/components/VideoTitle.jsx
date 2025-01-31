import React from "react";

const VideoTitle = ({ original_title, overview }) => {
  return (
    <div className="mt-80 px-16 absolute text-white  ">
      <h1 className="font-bold text-6xl mb-4 w-1/2">{original_title}</h1>
      <button className="px-3  py-1 font-medium text-2xl border rounded-sm bg-black text-white cursor-pointer hover:bg-gray-700">
        {" "}
        ▶️ Play
      </button>
      <button className="px-3 py-1 ml-2 font-medium text-2xl border rounded-sm bg-black text-white cursor-pointer hover:bg-gray-700">
        More Info
      </button>
      <p className="w-1/2 mb-4">{overview}</p>
    </div>
  );
};

export default VideoTitle;
