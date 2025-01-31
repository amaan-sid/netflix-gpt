import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
const PrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user); // Get user from Redux store

  return user ? children : <Navigate to="/" />; // If logged in, allow access; else redirect to login
};

export default PrivateRoute;
