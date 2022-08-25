import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { json_data } from "../Data";
import { PlusSmIcon as PlusSmIconOutline, DotsVerticalIcon, LogoutIcon } from "@heroicons/react/outline";
import Link from "next/link";
import axios from "axios";
import DynamicModal from "../components/DynamicModal";
import { useEffect, useState } from "react";
import { db, app } from "../firebase/firebaseConfig";
import { getDocs, collection, doc, setDoc, addDoc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";
import OptionsPanel from "../components/optionsPanel";
import Login from "../components/login";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";
import Loading from "../components/loading";

const HomePage = ({ user }) => {
  const [openPanel, setOpenPanel] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({});
  const [plans, setPlans] = useState([]);
  const collectionRef = collection(db, "plan");
  const [selectedPlan, setSelectedPlan] = useState({});

  const createNewPlan = async (e) => {
    e.currentTarget.disabled = true;

    setError(null);
    const collectionRef = collection(db, "plan");
    if (input.img_plan && input.name_plan && user) {
      let newPlan = await addDoc(collectionRef, { uid: user.uid, name: input.name_plan, url: input.img_plan });
      setOpen(false);
    } else {
      setError("Please, fill all the fields");
    }
  };
  useEffect(() => {
    if (Object.entries(user).length > 0) {
      const planCollectionRef = query(collection(db, "plan"), where("uid", "==", user.uid));
      onSnapshot(planCollectionRef, (snapshot) => {
        setPlans(
          snapshot.docs.map((doc) => {
            let id = doc.id;
            return { ...doc.data(), id };
          })
        );
      });
    }
  }, [user]);
  const deletePlan = async () => {
    try {
      let selectedPlanRef = doc(db, "plan", selectedPlan.id);
      let workoutCollectionRef = collection(db, "plan", selectedPlan.id, "workouts");
      let workouts = await getDocs(workoutCollectionRef);

      workouts.docs.map(async (workout) => {
        let workoutId = workout.id;
        let workoutRef = doc(db, "plan", selectedPlan.id, "workouts", workoutId);
        let exerciseCollectionRef = collection(db, "plan", selectedPlan.id, "workouts", workoutId, "exercises");

        let exercises = await getDocs(exerciseCollectionRef);
        exercises.docs.map(async (exercise) => {
          let exerciseId = exercise.id;
          let exerciseRef = doc(db, "plan", selectedPlan.id, "workouts", workoutId, "exercises", exerciseId);
          let historyCollectionRef = collection(
            db,
            "plan",
            selectedPlan.id,
            "workouts",
            workoutId,
            "exercises",
            exerciseId,
            "history"
          );

          let history = await getDocs(historyCollectionRef);

          history.docs.map(async (history) => {
            let historyId = history.id;
            let historyRef = doc(
              db,
              "plan",
              selectedPlan.id,
              "workouts",
              workoutId,
              "exercises",
              exerciseId,
              "history",
              historyId
            );
            await deleteDoc(historyRef);
          });
          await deleteDoc(exerciseRef);
        });
        await deleteDoc(workoutRef);
      });

      await deleteDoc(selectedPlanRef);

      setOpenPanel(false);
    } catch (error) {
      setError("Ups, an error ocurred! We couldn't delete your plan.");
    }
  };

  const signOutUser = () => {
    signOut(auth);
  };
  if (user !== null  && plans.length > 0) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Gym progress app" />
          <meta name="viewport" content="width=device-width; initial-scale=1"></meta>
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />

          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="icon" href="/icon.png" />
        </Head>
        <DynamicModal
          setOpen={setOpen}
          open={open}
          input={input}
          setInput={setInput}
          modalType={"plan"}
          action={createNewPlan}
          error={error}
        />
        <OptionsPanel openPanel={openPanel} setOpenPanel={setOpenPanel} deletion={deletePlan} />
        <div className="bg-white h-screen w-full">
          <div className="h-[20%] p-8 pl-8 flex">
            <div>
              <div className="flex text-base font-light">
                <h1>{`Hello`}</h1>
                <h1 className="text-violet-700 font-semibold mx-2">{`${user?.displayName}`}</h1>
              </div>
              <h1 className=" text-2xl font-bold w-5/6">Choose the plan you are working on</h1>
            </div>
            <button className=" w-5 h-5 self-start" onClick={signOutUser}>
              <LogoutIcon className="w-8 h-8" />
            </button>
          </div>
          <div className="h-[60%] overflow-x-auto overflow-hidden flex items-center">
            {plans.map((plan) => (
              <div key={plan.id} className="relative h-3/4 mx-2  min-w-[50%] flex items-end justify-center">
                <img
                  className="absolute inset-0 h-full w-full object-cover rounded-xl "
                  src={plan.url}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      "https://images.pexels.com/photos/841134/pexels-photo-841134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
                  }}
                />
                <div className="absolute inset-0 rounded-xl bg-black opacity-30" />
                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setOpenPanel(true);
                  }}
                  className="absolute top-6 right-4"
                >
                  <DotsVerticalIcon className="  h-10 w-10 text-white" />
                </button>
                <Link href={`/plan/${plan.id}`} key={plan}>
                  <div className="absolute mb-8 h-[70%] w-full flex items-center  justify-center">
                    <h1 className=" text-4xl font-bold bottom-0 text-white">{plan.name}</h1>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="h-[20%] flex justify-center items-center">
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="inline-flex  shadow-xl items-center p-4 border border-transparent rounded-full  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusSmIconOutline className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }

};

export default HomePage;
