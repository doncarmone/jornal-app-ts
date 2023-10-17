// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC9mtINalep2KziZXXHAFXX9BOVthqSFM",
  authDomain: "react-curso-fcd16.firebaseapp.com",
  projectId: "react-curso-fcd16",
  storageBucket: "react-curso-fcd16.appspot.com",
  messagingSenderId: "103261952585",
  appId: "1:103261952585:web:2925fdee3469db475a7d98"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);