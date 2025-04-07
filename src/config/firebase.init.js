// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITEPROJECTID,
  storageBucket: import.meta.env.VITESTORAGEBUCKET,
  messagingSenderId: import.meta.env.VITEMESSAGINGSENDERID,
  appId: import.meta.env.VITEAPPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);