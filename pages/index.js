import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { json_data } from "../Data";
import { PlusSmIcon as PlusSmIconOutline, DotsVerticalIcon } from "@heroicons/react/outline";
import Link from "next/link";
import axios from "axios";
import DynamicModal from "../components/DynamicModal";
import { useEffect, useState } from "react";
import { db, app } from "../firebase/firebaseConfig";
import { getDocs, collection, doc, setDoc, addDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import OptionsPanel from "../components/optionsPanel";
import Login from "../components/login";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import HomePage from "./home";



export default function Home() {

  const [user, setUser] = useState({});
  const [authentication, setAuthentication] = useState(false);

   const googleSignIn = () => {
     const provider = new GoogleAuthProvider();
     // signInWithPopup(auth, provider);
     signInWithRedirect(auth, provider);
   };

   const logOut = () => {
     signOut(auth);
   };

   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
       setUser(currentUser);
      //  console.log("User", currentUser);
     });
     return () => {
       unsubscribe();
     };
   }, []);
  if (!user) {
    return <Login googleSignIn={googleSignIn} />;
  } else {
    return <HomePage user={user}/>
  }
}
