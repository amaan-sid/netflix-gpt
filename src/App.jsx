import React, { useEffect } from "react";
import "./App.css";
import Browse from "./components/Browse";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import appStore from "./utils/appStore";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase"; // Import firebase auth
import { addUser, removeUser } from "./utils/userSlice";
function App() {
  return (
    <Provider store={appStore}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/browse"
              element={
                <PrivateRoute>
                  <Browse />
                </PrivateRoute>
              }
            />
            {/* <Route path="/login" element={<Login />} />  */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
