import React from "react";

const DropSetExercise = ({ exercise }) => {
  const {
    excersice_1_dropset_reps,
    excersice_1_dropset_weight,
    excersice_1_name,
    excersice_1_max_reps,
    excersice_1_min_reps,
    excersice_1_sets,
    excersice_1_weight,
  } = exercise;
  return (
    <div className="w-11/12 mx-auto bg-gray-100 rounded-lg my-2 p-2">
      <h1 className=" font-bold text-lg">Dropset</h1>
      <div className="flex flex-col px-4 pt-2">
        <h1 className=" font-bold">{excersice_1_name}</h1>
        <div className="flex justify-between items-center ">
          <h1 className="text-gray-500 text-sm">{`${excersice_1_sets} sets of ${excersice_1_min_reps}-${excersice_1_max_reps}`}</h1>
          <h1 className="text-indigo-600 font-bold">{`${excersice_1_weight} Kg`}</h1>
        </div>
        <div className="flex justify-between  ">
          <h1 className="text-gray-500 text-sm">{`1 sets of ${excersice_1_dropset_reps} `}</h1>
          <h1 className="text-indigo-600 font-bold">{`${excersice_1_dropset_weight} Kg`}</h1>
        </div>
      </div>
    </div>
  );
};

export default DropSetExercise;
