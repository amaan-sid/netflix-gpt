// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Missing import added here
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtV5ZKz8VlsbP4-wyMdlib-JtKszhh2Dw",
  authDomain: "netflix-gpt-5f8d0.firebaseapp.com",
  projectId: "netflix-gpt-5f8d0",
  storageBucket: "netflix-gpt-5f8d0.appspot.com", // Fixed typo: ".app" to ".appspot.com"
  messagingSenderId: "1010712321001",
  appId: "1:1010712321001:web:8a9dfe5674fb619b994978",
  measurementId: "G-FQ70CMG3JH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Exporting auth for usage in authentication
export default app;
