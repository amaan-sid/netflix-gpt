import React, { useRef, useState } from "react";
import Home from "./Home";
import { Link, useNavigate } from "react-router-dom";
import { formValidation } from "../utils/formValidate";
import Browse from "./Browse";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const handleclickbtn = (event) => {
    event.preventDefault();
    const message = formValidation(email.current.value, password.current.value);
    // if (!message) return;
    seterrorMessage(message);
    // console.log(message);
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("User: ", user);
          navigate("/browse");
          console.log("Navigating to /browse...");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errMessage = error.message;
          seterrorMessage(errMessage)
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User: ", user);
          navigate("/browse");
          console.log("Navigating to /browse...");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMess = error.message;
          seterrorMessage(errorCode);
        });
    }
  };
  const toggleForm = () => {
    setisSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Home />
      <div className="absolute z-50 w-3/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* <div className="absolute inset-0 bg-black/50"></div> */}
        <form className=" text-white z-50 bg-black/50 rounded-2xl pb-3 ">
          <h1 className="text-4xl font-bold translate-x-1/3 my-2 text-red-600">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="p-2 my-2 rounded bg-gray-400 w-5/6 translate-x-1/12"
              />{" "}
              <br />
              
            </div>
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-2 my-2 rounded bg-gray-400 w-5/6 translate-x-1/12"
          />{" "}
          <br />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-2 my-2 rounded  bg-gray-400 translate-x-1/12 w-5/6"
          />{" "}
          <br />
          <p className="px-2 text-red-500">{errorMessage} </p>
          <button
            className="p-2 my-2 w-5/6 translate-x-1/12 rounded bg-red-500 text-xl font-bold cursor-pointer"
            onClick={(event) => {
              // event.preventDefault();
              handleclickbtn(event);
            }}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="my-2 mx-4">
            {" "}
            {isSignInForm
              ? "Don't have an account? "
              : " Already have an account? "}
            <button
              className="text-blue-600 cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                toggleForm();
              }}
            >
              {!isSignInForm ? "Sign In" : "Sign Up"}
            </button>{" "}
          </p>
          {/* {isSignInForm && (
            <p className="my-2 mx-4">
              Forgot your password?{" "}
              <button className="text-blue-600 cursor-pointer">Reset it</button>
            </p>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default Login;
