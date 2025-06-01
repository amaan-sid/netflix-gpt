// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtV5ZKz8VlsbP4-wyMdlib-JtKszhh2Dw",
  authDomain: "netflix-gpt-5f8d0.firebaseapp.com",
  projectId: "netflix-gpt-5f8d0",
  storageBucket: "netflix-gpt-5f8d0.firebasestorage.app",
  messagingSenderId: "1010712321001",
  appId: "1:1010712321001:web:8a9dfe5674fb619b994978",
  measurementId: "G-FQ70CMG3JH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);