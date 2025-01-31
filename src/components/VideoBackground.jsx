import useTrailor from "../hooks/useTrailor";
import { useSelector } from "react-redux";

const VideoBackground = ({ id }) => {
  useTrailor(id);
  // const movie_id =useSelector((store) => store.movies.mainTrailor.key);
  // if (!movie_id) return null;
  // console.log("Movie id:", movie_id);
  
  const mainTrailor = useSelector((store) => store.movies.mainTrailor);
  if (!mainTrailor) return null;
  // console.log("Main trailor:", mainTrailor);
  const movie_id = mainTrailor.key;
  return (
    <div className="w-screen absolute ">
      <iframe className="w-screen aspect-video"
       src={`https://www.youtube.com/embed/${movie_id}?autoplay=1&mute=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
    // <div> Trailor here</div>
  );
};

export default VideoBackground;
