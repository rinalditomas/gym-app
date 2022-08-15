// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-4KkTeSQlbhfA4sZJr35f_45C8eanPI4",
  authDomain: "gym-app-22558.firebaseapp.com",
  projectId: "gym-app-22558",
  storageBucket: "gym-app-22558.appspot.com",
  messagingSenderId: "56634141476",
  appId: "1:56634141476:web:40c3a9cbf0f04ba5bb21b1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
