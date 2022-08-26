import React, { useEffect, useState } from "react";

import { db, app } from "../../../../../../../firebase/firebaseConfig";
import {
  getDoc,
  collection,
  doc,
  getDocs,
  addDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { ArrowLeftIcon, PlusSmIcon } from "@heroicons/react/outline";
import { classNames, functionToSetTimeOutForErrors } from "../../../../../../../constants/Functions";
import DayExtract from "../../../../../../../components/dayExtract";
import DynamicModal from "../../../../../../../components/DynamicModal";
import Loading from "../../../../../../../components/loading";

const Workout = ({ id, workoutId, exerciseId }) => {
  const [exercises, setExercises] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("history");
  const [error, setError] = useState(null);
  const [mainError, setMainError] = useState(null);
  const [input, setInput] = useState({});
  const [open, setOpen] = useState(false);


  let historyRef = collection(db, "plan", id, "workouts", workoutId, "exercises", exerciseId, "history");
  let exerciseRef = doc(db, "plan", id, "workouts", workoutId, "exercises", exerciseId);

  let workoutRef = doc(db, "plan", id, "workouts", workoutId);

  const addNewRegister = async (e) => {
    e.currentTarget.disabled = true;

    setError(null);
    let reps = [];
    let reps_super_set = [];
    let weight = [];
    let weight_super_set = [];
    for (const keys in input) {
      if (keys.includes("reps")) {
        keys.includes("second") ? reps_super_set.push(input[keys]) : reps.push(input[keys]);
      }
      if (keys.includes("weight")) {
        keys.includes("second") ? weight_super_set.push(input[keys]) : weight.push(input[keys]);
      }
    }

    let newPlan = await addDoc(historyRef, {
      date: new Date().toDateString(),
      dateStamp: Timestamp.now(),
      reps: reps,
      reps_super_set: reps_super_set.length > 0 ? reps_super_set : null,
      weight: weight,
      weight_super_set: weight_super_set.length > 0 ? weight_super_set : null,
    });
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    const getDB = async () => {
      let excersiceSnap = await getDoc(exerciseRef);

      if (excersiceSnap.exists()) {
        setExercises(excersiceSnap.data());
      } else {
        console.log("No such document!");
      }
      let q = query(historyRef, orderBy("dateStamp", "desc"), limit(1));
      onSnapshot(q, (snapshot) => {
        setHistory(
          snapshot.docs.map((doc) => {
            let id = doc.id;

            return { ...doc.data(), id };
          })
        );
      });
    };

    getDB();
  }, []);



  const handleNewDateSelected = (e) => {
    setMainError(null)
    let value = e.target.value;
    let date = new Date(value).toDateString();
    let q = query(historyRef, where("date", "==", date))

  
     
    try {
        onSnapshot(q, (snapshot) => {
          console.log()
          if (snapshot.docs.length < 1){
            let message = 'No records found in the picked date'
                setMainError(message)
                setHistory([])
          }else{
            setHistory(
              snapshot.docs.map((doc) => {
                let id = doc.id;

                return { ...doc.data(), id };
              })
            );

          }
        });
    } catch (error) {
      console.log(error)
    }
  };

  if (exercises.excersice_1_name) {
    return (
      <div className="h-screen">
        <DynamicModal
          setOpen={setOpen}
          open={open}
          input={input}
          setInput={setInput}
          modalType={"history"}
          action={addNewRegister}
          error={error}
          extraInfo={exercises}
        />
        <div className="grid grid-cols-3 w-full p-4 h-[10%] items-center">
          <Link href={`/plan/${id}/workout/${workoutId}`} className="my-auto">
            <ArrowLeftIcon className="h-8 w-8" />
          </Link>
          <h1 className="mx-auto my-auto font-bold text-sm ">{exercises.excersice_1_name}</h1>{" "}
        </div>
        <div className="flex flex-col items-center h-[70%] overflow-y-auto">
          <div className="mx-auto self-start ">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                onClick={() => setSelectedTab("history")}
                name="exercise_type"
                value="superset"
                type="button"
                className={
                  selectedTab === "history"
                    ? "relative inline-flex items-center px-14 py-2 rounded-l-md border bg-indigo-600  text-sm font-medium text-white  focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    : "relative inline-flex items-center px-14 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                }
              >
                History
              </button>

              <button
                onClick={() => setSelectedTab("graph")}
                name="exercise_type"
                value="dropset"
                type="button"
                className={
                  selectedTab === "graph"
                    ? "-ml-px relative inline-flex items-center px-14 py-2 rounded-r-md border bg-indigo-600  text-sm font-medium text-white focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    : "-ml-px relative inline-flex items-center px-14 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                }
              >
                Graph
              </button>
            </span>
          </div>
          <div className="w-full flex  flex-col items-center justify-center mt-4 ">
            <h1>Last record</h1>
            {history.map((hist, index) => (
              <DayExtract history={hist} key={index} />
            ))}
          </div>
          {mainError && <span className="my-2 font-semibold text-red-800 rounded-xl p-2 bg-red-100">{mainError}</span>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Pick Date
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="date"
                id="date"
                onChange={(e) => handleNewDateSelected(e)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="you@example.com"
              />
            </div>
          </div>
        </div>
        <div className="h-[20%] flex justify-center items-center">
          <button
            onClick={() => {
              setOpen(true);
            }}
            type="button"
            className="inline-flex  shadow-xl items-center p-4 border border-transparent rounded-full  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusSmIcon className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};
export async function getServerSideProps(context) {
  let id = context.query.id;
  let workoutId = context.query.workoutId;
  let exerciseId = context.query.exerciseId;

  return { props: { id, workoutId, exerciseId } };
}

export default Workout;
