import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, ChevronRightIcon, PlusSmIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import DynamicModal from "../../../components/DynamicModal";
import { db, app } from "../../../firebase/firebaseConfig";
import { getDoc, collection, doc, getDocs, setDoc, addDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import OptionsPanel from "../../../components/optionsPanel";
import { async } from "@firebase/util";
import Loading from "../../../components/loading";

const Plan = ({ id }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [input, setInput] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [plan, setPlan] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState({});
  const router = useRouter();

  let workoutRef = collection(db, "plan", id, "workouts");
  let planRef = doc(db, "plan", id);

  const createNewWorkOut = async (e) => {
    e.currentTarget.disabled = true;

    setError(null);
    const workoutRef = collection(db, "plan", id, "workouts");
    if (input.name_workout) {
      let newWkt = await addDoc(workoutRef, { name: input.name_workout });
      setOpen(false);
    } else {
      setError("Please, fill all the fields");
    }
  };

  useEffect(() => {
    const getDB = async () => {
      const planSnap = await getDoc(planRef);

      if (planSnap.exists()) {
        setPlan(planSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      onSnapshot(workoutRef, (snapshot) => {
        setWorkouts(
          snapshot.docs.map((doc) => {
            let id = doc.id;

            return { ...doc.data(), id };
          })
        );
      });
    };
    getDB();
  },[]);

  const deleteWorkOut = async () => {
    let exercisesCollectionRef = collection(db, "plan", id, "workouts", selectedWorkout.id, "exercises");
    let selectedWorkoutRef = doc(db, "plan", id, "workouts", selectedWorkout.id);
    let exercises = await getDocs(exercisesCollectionRef);
    exercises.docs.map(async (exc) => {
      let exerciseId = exc.id;
      let exerciseRef = doc(db, "plan", id, "workouts", selectedWorkout.id, "exercises", exerciseId);

      let historyRef = collection(db, "plan", id, "workouts", selectedWorkout.id, "exercises", exerciseId, "history");
      let historial = await getDocs(historyRef);

      if (historial.docs.length > 0) {
        historial.docs.map(async (history) => {
          let innerRef = doc(
            db,
            "plan",
            id,
            "workouts",
            selectedWorkout.id,
            "exercises",
            exerciseId,
            "history",
            history.id
          );
          await deleteDoc(innerRef);
        });
      }

      await deleteDoc(exerciseRef);
    });
    await deleteDoc(selectedWorkoutRef);
    setOpenPanel(false);
  };

  if(plan.name  ){

    return (
      <div className="h-screen">
        <DynamicModal
          setOpen={setOpen}
          open={open}
          input={input}
          setInput={setInput}
          modalType={"workout"}
          action={createNewWorkOut}
          error={error}
        />
        <OptionsPanel openPanel={openPanel} setOpenPanel={setOpenPanel} deletion={deleteWorkOut} />
        <div className="grid grid-cols-3 w-full p-4 h-[10%] items-center">
          <Link href={"/"} className="my-auto">
            <ArrowLeftIcon className="h-8 w-8" />
          </Link>
          <h1 className="mx-auto my-auto font-bold text-lg ">{plan.name}</h1>
        </div>
  
        <div className="flex flex-col items-center mt-8 h-[66%] overflow-y-auto ">
          {workouts &&
            workouts.map((workout, index) => (
              <div
                key={index}
                className="flex w-11/12 py-6 px-3 my-2 rounded-lg bg-gray-100 items-center justify-between"
              >
                <Link href={`/plan/${id}/workout/${workout.id}`} key={workout.id}>
                  <h1 className="text-gray-600 font-semibold text-lg w-[90%] h-full">{workout.name}</h1>
                </Link>
                <button
                  className=" border-indigo-600 rounded-lg "
                  onClick={() => {
                    setSelectedWorkout(workout);
                    setOpenPanel(true);
                  }}
                >
                  <DotsVerticalIcon className="w-6 h-6 text-indigo-600 font-bold" />
                </button>
              </div>
            ))}
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
  }else{
    return <Loading />
  }
};
export async function getServerSideProps(context) {
  let id = context.query.id;

  return { props: { id } };
}

export default Plan;
