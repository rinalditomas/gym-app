import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, PlusSmIcon, TrashIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { db, app } from "../../../../../firebase/firebaseConfig";
import { getDoc, collection, doc, getDocs, addDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import DropSetExercise from "../../../../../components/dropSetExercise";
import SuperSetExercise from "../../../../../components/superSetExercise";
import RegularExercise from "../../../../../components/regularExercise";
import DynamicModal from "../../../../../components/DynamicModal";
import { async } from "@firebase/util";

const Workout = ({ id, workoutId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState({});
  const [exercises, setExercises] = useState([]);
  const [workout, setWorkout] = useState({});
  const router = useRouter();


  let exerciseRef = collection(db, "plan", id, "workouts", workoutId, "exercises");
  let workoutRef = doc(db, "plan", id, "workouts", workoutId);
  
  useEffect(() => {
    const getDB = async () => {
      const workoutSnap = await getDoc(workoutRef);

      if (workoutSnap.exists()) {
        setWorkout(workoutSnap.data());
      } else {
        console.log("No such document!");
      }

         onSnapshot(exerciseRef, (snapshot) => {
           setExercises(
             snapshot.docs.map((doc) => {
               let id = doc.id;

               return { ...doc.data(), id };
             })
           );
         });

    
    };

    getDB();
  });

  const createNewExc = async () => {
    setError(null);
    const excRef = collection(db, "plan", id, "workouts", workoutId, "exercises");
    if (input.exercise_type === "regular") {
      if (
        input.excersice_1_name &&
        input.excersice_1_sets &&
        input.excersice_1_min_reps &&
        input.excersice_1_max_reps &&
        input.excersice_1_weight
      ) {
        let newExc = await addDoc(exerciseRef, input);

        if (newExc.id) {
          let newObj = input;
          newObj.id = newExc.id;
          setExercises([...exercises, newObj]);
          setOpen(false);
          setInput({});
        } else {
          setError("Something went wrong");
        }
      } else {
        setError("Please, fill all the fields");
      }
    } else if (input.exercise_type === "superset") {
      if (
        input.excersice_1_name &&
        input.excersice_1_sets &&
        input.excersice_1_min_reps &&
        input.excersice_1_max_reps &&
        input.excersice_1_weight &&
        input.excersice_2_name &&
        input.excersice_2_sets &&
        input.excersice_2_min_reps &&
        input.excersice_2_max_reps &&
        input.excersice_2_weight
      ) {
        let newExc = await addDoc(exerciseRef, input);
        if (newExc.id) {
          let newObj = input;
          newObj.id = newExc.id;
          setExercises([...exercises, newObj]);
          setOpen(false);
          setInput({});
        } else {
          setError("Something went wrong");
        }
      } else {
        setError("Please, fill all the fields");
      }
    } else if (input.exercise_type === "dropset") {
      if (
        input.excersice_1_name &&
        input.excersice_1_sets &&
        input.excersice_1_min_reps &&
        input.excersice_1_max_reps &&
        input.excersice_1_weight &&
        input.excersice_1_dropset_weight &&
        input.excersice_1_dropset_reps
      ) {
        let newExc = await addDoc(exerciseRef, input);
        if (newExc.id) {
          let newObj = input;
          newObj.id = newExc.id;
          setExercises([...exercises, newObj]);
          setOpen(false);
          setInput({});
        } else {
          setError("Something went wrong");
        }
      } else {
        setError("Please, fill all the fields");
      }
    } else {
      setError("Please, select the type of exercise that you want to create");
    }

    
  };
  const deleteExercise= async(exercise)=>{
    console.log(exercise);
      let historyRef = collection(db, "plan", id, "workouts", workoutId, "exercises", exercise.id, "history");
      let selectedExerciseRef = doc(db, "plan", id, "workouts", workoutId, "exercises", exercise.id, );
      let historial = await getDocs(historyRef)
      
      if(historial.docs.length > 0){

        historial.docs.map(async(history)=>{
            let innerRef = doc(db, "plan", id, "workouts", workoutId, "exercises", exercise.id, "history", history.id);
            await deleteDoc(innerRef);
        })
      }
      await deleteDoc(selectedExerciseRef)
      
  }
  return (
    <div className="h-screen">
      <DynamicModal
        setOpen={setOpen}
        open={open}
        input={input}
        setInput={setInput}
        modalType={"exercise"}
        action={createNewExc}
        error={error}
      />
      <div className="grid grid-cols-3 w-full p-4 h-[10%] items-center">
        <Link href={`/plan/${id}`} className="my-auto">
          <ArrowLeftIcon className="h-8 w-8" />
        </Link>
        <h1 className="mx-auto my-auto font-bold text-lg ">{workout.name}</h1>{" "}
        <button onClick={() => setEditMode(!editMode)} className=" justify-self-end">
          Edit
        </button>
      </div>
      {exercises ? (
        <>
          <div className="flex flex-col  items-center h-[70%]">
            {exercises.map((exc, index) =>
              exc.exercise_type === "dropset" ? (
                <div className="w-full" key={index}>
                  {editMode ? (
                    <div className="flex w-full">
                      <button
                        className="w-[80%] text-left"
                        onClick={() => router.push(`/plan/${id}/workout/${workoutId}/exercise/${exc.id}`)}
                      >
                        <DropSetExercise exercise={exc} />
                      </button>
                      <button
                        onClick={() => deleteExercise(exc)}
                        className=" self-center mx-auto h-10 w-10 text-center rounded-full text-lg bg-red-500 text-red-800 font-extrabold"
                      >
                        <TrashIcon className="h-5 w-5 text-white mx-auto" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full text-left"
                      onClick={() => router.push(`/plan/${id}/workout/${workoutId}/exercise/${exc.id}`)}
                    >
                      <DropSetExercise exercise={exc} />
                    </button>
                  )}
                </div>
              ) : exc.exercise_type === "superset" ? (
                <div className="w-full" key={index}>
                  {editMode ? (
                    <div className="flex w-full ">
                      <button
                        className="w-[80%] text-left"
                        onClick={() => router.push(`/plan/${id}/workout/${workoutId}/exercise/${exc.id}`)}
                      >
                        <SuperSetExercise exercise={exc} />
                      </button>
                      <button
                        onClick={() => deleteExercise(exc)}
                        className=" self-center mx-auto h-10 w-10 text-center rounded-full text-lg bg-red-500 text-red-800 font-extrabold"
                      >
                        <TrashIcon className="h-5 w-5 text-white mx-auto" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full text-left"
                      onClick={() => router.push(`/plan/${id}/workout/${workoutId}/exercise/${exc.id}`)}
                    >
                      <SuperSetExercise exercise={exc} />
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full" key={index}>
                  {editMode ? (
                    <div className="flex w-full">
                      <button
                        className="w-[80%] text-left"
                        onClick={() => router.push(`/plan/${id}/workout/${workoutId}/exercise/${exc.id}`)}
                      >
                        <RegularExercise exercise={exc} />
                      </button>
                      <button
                        onClick={() => deleteExercise(exc)}
                        className=" self-center mx-auto h-10 w-10 text-center rounded-full text-lg bg-red-500 text-red-800 font-extrabold"
                      >
                        <TrashIcon className="h-5 w-5 text-white mx-auto" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full text-left"
                      onClick={() => router.push(`/plan/${id}/workout/${workoutId}/exercise/${exc.id}`)}
                    >
                      <RegularExercise exercise={exc} />
                    </button>
                  )}
                </div>
              )
            )}
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
        </>
      ) : (
        <div className="w-full h-[90%] flex flex-col items-center justify-center">
          <div
            className="inline-block w-24 h-24 
              border-8 
              border-t-violet-900 
              border-r-violet-700 
              border-b-violet-500 
              border-l-violet-300 
              rounded-full 
              animate-spin"
          ></div>
        </div>
      )}
    </div>
  );
};
export async function getServerSideProps(context) {
  let id = context.query.id;
  let workoutId = context.query.workoutId;

  return { props: { id, workoutId } };
}

export default Workout;
