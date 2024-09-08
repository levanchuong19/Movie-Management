// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBRWI4JpAPZUOdxlK2lkvlRzOvRh8hab4",
  authDomain: "movie-29d08.firebaseapp.com",
  projectId: "movie-29d08",
  storageBucket: "movie-29d08.appspot.com",
  messagingSenderId: "570664107883",
  appId: "1:570664107883:web:9e7a946558f64b3db5d62e",
  measurementId: "G-DNTN03CK2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
export {storage , googleProvider, auth};