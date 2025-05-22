import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANCSqq917kfqigdervUThOzSVHS3FRMa8",
  authDomain: "coffee-house-com.firebaseapp.com",
  projectId: "coffee-house-com",
  storageBucket: "coffee-house-com.firebasestorage.app",
  messagingSenderId: "701560460128",
  appId: "1:701560460128:web:272db5900b7140d5da0405"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;


// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID,
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,  
//   };