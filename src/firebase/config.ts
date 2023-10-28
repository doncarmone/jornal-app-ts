// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironments();

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCpEdTkkC3-iN3grEavk_sfxTGT98RDpFc",
//   authDomain: "react-app-cursos-2022.firebaseapp.com",
//   projectId: "react-app-cursos-2022",
//   storageBucket: "react-app-cursos-2022.appspot.com",
//   messagingSenderId: "471250161505",
//   appId: "1:471250161505:web:fd601c945b33ce11237f20"
// };


// dev Prod
// const firebaseConfig = {
//   apiKey: "AIzaSyDC9mtINalep2KziZXXHAFXX9BOVthqSFM",
//   authDomain: "react-curso-fcd16.firebaseapp.com",
//   projectId: "react-curso-fcd16",
//   storageBucket: "react-curso-fcd16.appspot.com",
//   messagingSenderId: "103261952585",
//   appId: "1:103261952585:web:2925fdee3469db475a7d98"
// };

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);