// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzclJjjh2yEJnmg4tQhaQSkv1zvdnFpVE",
  authDomain: "movie-space-d4bb4.firebaseapp.com",
  projectId: "movie-space-d4bb4",
  storageBucket: "movie-space-d4bb4.firebasestorage.app",
  messagingSenderId: "15063787884",
  appId: "1:15063787884:web:3cd004b52d5ae986822b49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;