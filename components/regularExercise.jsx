import React from "react";

const RegularExercise = ({exercise}) => {
  const { excersice_1_name, excersice_1_max_reps, excersice_1_min_reps, excersice_1_sets, excersice_1_weight } =
    exercise;
  return (
    <div className="w-11/12 mx-auto bg-gray-100 rounded-lg my-2 p-2">
      <h1 className=" font-bold text-lg">Regular</h1>
      <div className="flex justify-between items-center px-4">
        <div className="flex flex-col pt-2">
          <h1 className=" font-bold">{excersice_1_name}</h1>
          <h1 className="text-gray-500 text-sm">{`${excersice_1_sets} sets of ${excersice_1_min_reps}-${excersice_1_max_reps}`}</h1>
        </div>
        <h1 className="text-indigo-600 font-bold">{`${excersice_1_weight} Kg`}</h1>
      </div>
    </div>
  );
};

export default RegularExercise;
