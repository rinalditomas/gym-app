import React, { useRef } from "react";
import ModalComponent from "./ModalComponent";
import { NewPlan, NewWorkOut } from "../constants/Modals";
import { CheckIcon } from "@heroicons/react/outline";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "../constants/Functions";

const DynamicModal = ({ modalType, open, setOpen, setInput, input, action, error, extraInfo }) => {
  const [enabled, setEnabled] = useState(false);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "exercise_type" && value === "regular") {
      delete input?.excersice_1_dropset_reps;
      delete input?.excersice_1_dropset_weight;
      delete input?.excersice_2_name;
      delete input?.excersice_2_sets;
      delete input?.excersice_2_max_reps;
      delete input?.excersice_2_min_reps;
      delete input?.excersice_2_weight;
    }
    if (name === "exercise_type" && value === "superset") {
      delete input?.excersice_1_dropset_reps;
      delete input?.excersice_1_dropset_weight;
    }
    if (name === "exercise_type" && value === "dropset") {
      delete input?.excersice_2_name;
      delete input?.excersice_2_sets;
      delete input?.excersice_2_max_reps;
      delete input?.excersice_2_min_reps;
      delete input?.excersice_2_weight;
    }
    setInput({ ...input, [name]: value });
  };

  const renderInputs = (repetitions, type, number) => {
    let duplicate = type === "regular" ? parseInt(repetitions) : parseInt(repetitions) + 1;
    let inputs = [];

    for (let index = 1; index <= duplicate; index++) {
      let structure = (
        <div className="my-4">
          <label htmlFor="name_workout" className="text-left block text-sm font-medium text-gray-700">
            {`Set Nº${index}`}
          </label>
          <div className="flex justify-between">
            <div className="mt-1 w-[45%] ">
              <input
                type="number"
                name={`reps_${index}_${number}`}
                id={`reps_${index}_${number}`}
                className="shadow-sm focus:ring-indigo-500 px-2 focus:border-indigo-500 block w-full py-2 sm:text-sm border-[1px] border-gray-300 rounded-md"
                placeholder="Repetitions"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mt-1 w-[45%] ">
              <input
                type="number"
                name={`weight_${index}_${number}`}
                id={`weight_${index}_${number}`}
                className="shadow-sm focus:ring-indigo-500 px-2 focus:border-indigo-500 block w-full py-2 sm:text-sm border-[1px] border-gray-300 rounded-md"
                placeholder="Weight"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>
      );
      inputs.push(structure);
    }

    return inputs;
  };
  return (
    <div>
      <ModalComponent setOpen={setOpen} input={input} open={open} modalType={modalType} action={action} error={error}>
        {modalType === "plan" ? (
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Add a new plan
              </Dialog.Title>
              <div className="mt-2">
                <div className="my-4">
                  <label htmlFor="name_plan" className="text-left block text-sm font-medium text-gray-700">
                    Name of the plan
                  </label>
                  <div className="mt-1 ">
                    <input
                      type="text"
                      name="name_plan"
                      id="name_plan"
                      className="shadow-sm focus:ring-indigo-500 px-2 focus:border-indigo-500 block w-full py-2 sm:text-sm border-[1px] border-gray-300 rounded-md"
                      placeholder="Ready for summer"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="my-8">
                  <label htmlFor="img_plan" className=" text-left block text-sm font-medium text-gray-700">
                    Backgroud image
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      name="img_plan"
                      id="img_plan"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full px-2 py-2 sm:text-sm border-[1px] border-gray-300 rounded-md"
                      placeholder="Paste the url of an image"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : modalType === "workout" ? (
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Add a new workout
              </Dialog.Title>
              <div className="mt-2">
                <div className="my-4">
                  <label htmlFor="name_workout" className="text-left block text-sm font-medium text-gray-700">
                    Name of the workout
                  </label>
                  <div className="mt-1 ">
                    <input
                      type="text"
                      name="name_workout"
                      id="name_workout"
                      className="shadow-sm focus:ring-indigo-500 px-2 focus:border-indigo-500 block w-full py-2 sm:text-sm border-[1px] border-gray-300 rounded-md"
                      placeholder="Ready for summer"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : modalType === "history" ? (
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Add a new record
              </Dialog.Title>
              {extraInfo.exercise_type === "superset" ? (
                <div className="mt-2">
                  <div>
                    <span>Exercise 1</span>
                    {renderInputs(extraInfo.excersice_1_sets, "regular", 'first').map((input) => input)}
                  </div>
                  <div>
                    <span>Exercise 2</span>
                    {renderInputs(extraInfo.excersice_2_sets, "regular", 'second').map((input) => input)}
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  {renderInputs(extraInfo.excersice_1_sets, extraInfo.exercise_type, 'first').map((input) => input)}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Add a new exercise
              </Dialog.Title>
              <div className="mt-2">
                <div className="my-4">
                  <span className="relative z-0 inline-flex shadow-sm rounded-md">
                    <button
                      name="exercise_type"
                      value="superset"
                      onClick={(e) => handleChange(e)}
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      Superset
                    </button>
                    <button
                      name="exercise_type"
                      value="regular"
                      onClick={(e) => handleChange(e)}
                      type="button"
                      className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      Regular exercise
                    </button>
                    <button
                      name="exercise_type"
                      value="dropset"
                      onClick={(e) => handleChange(e)}
                      type="button"
                      className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      Dropset
                    </button>
                  </span>
                </div>

                <div className="my-5">
                  <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label
                      htmlFor="excersice_1_name"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Name of the exercise
                    </label>
                    <input
                      type="text"
                      name="excersice_1_name"
                      id="excersice_1_name"
                      onChange={(e) => handleChange(e)}
                      className="block w-full border-0 p-0 text-gray-900 focus:ring-0 sm:text-sm"
                      placeholder="Pulldown"
                    />
                  </div>
                </div>
                <div className="my-4">
                  <label htmlFor="excersice_1_sets" className=" text-left block text-sm font-medium text-gray-700">
                    {`Sets: ${input.excersice_1_sets}`}
                  </label>
                  <div className="mt-1">
                    <div>
                      <input
                        type="range"
                        name="excersice_1_sets"
                        id="excersice_1_sets"
                        list="tickmarks"
                        min="0"
                        max="10"
                        className="w-full appearance-none bg-gray-300 rounded-lg text-purple-800"
                        onChange={(e) => handleChange(e)}
                      />
                      <datalist id="tickmarks">
                        <option value="0"></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                        <option value="5"></option>
                        <option value="6"></option>
                        <option value="7"></option>
                        <option value="8"></option>
                        <option value="9"></option>
                        <option value="10"></option>
                      </datalist>
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="flex justify-between">
                    <div className="relative border w-[25%] border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="excersice_1_min_reps"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        Reps Min
                      </label>
                      <input
                        type="number"
                        pattern="\d*"
                        name="excersice_1_min_reps"
                        id="excersice_1_min_reps"
                        onChange={(e) => handleChange(e)}
                        className="block w-full border-0 p-0 text-gray-900  focus:ring-0 sm:text-sm"
                        placeholder="8"
                      />
                    </div>
                    <div className="relative border w-[25%] border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="excersice_1_max_reps"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        Reps Max
                      </label>
                      <input
                        type="number"
                        pattern="\d*"
                        name="excersice_1_max_reps"
                        id="excersice_1_max_reps"
                        onChange={(e) => handleChange(e)}
                        className="block w-full border-0 p-0 text-gray-900 focus:ring-0 sm:text-sm"
                        placeholder="12"
                      />
                    </div>
                    <div className="relative border w-[25%] border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="excersice_1_weight"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        weight
                      </label>
                      <input
                        type="number"
                        pattern="\d*"
                        name="excersice_1_weight"
                        id="excersice_1_weight"
                        onChange={(e) => handleChange(e)}
                        className="block w-full border-0 p-0 text-gray-900 focus:ring-0 sm:text-sm"
                        placeholder="56"
                      />
                    </div>
                  </div>
                </div>
                {input.exercise_type === "dropset" ? (
                  <div className="flex my-8 justify-between">
                    <div className="relative border w-[40%] border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="excersice_1_dropset_weight"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        Dropset weight
                      </label>
                      <input
                        type="number"
                        pattern="\d*"
                        name="excersice_1_dropset_weight"
                        id="excersice_1_dropset_weight"
                        onChange={(e) => handleChange(e)}
                        className="block w-full border-0 p-0 text-gray-900 focus:ring-0 sm:text-sm"
                        placeholder="4"
                      />
                    </div>
                    <div className="relative border w-[40%] border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="excersice_1_dropset_reps"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        Dropset reps
                      </label>
                      <input
                        type="number"
                        pattern="\d*"
                        name="excersice_1_dropset_reps"
                        id="excersice_1_dropset_reps"
                        onChange={(e) => handleChange(e)}
                        className="block w-full border-0 p-0 text-gray-900 focus:ring-0 sm:text-sm"
                        placeholder="12"
                      />
                    </div>
                  </div>
                ) : input.exercise_type === "superset" ? (
                  <div>
                    <h1 className=" font-bold my-4">Second exercise</h1>
                    <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="excersice_2_name"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        Name of exercise
                      </label>
                      <input
                        type="text"
                        name="excersice_2_name"
                        id="excersice_2_name"
                        onChange={(e) => handleChange(e)}
                        className="block w-full border-0 p-0 text-gray-900 focus:ring-0 sm:text-sm"
                        placeholder="Squats"
                      />
                    </div>
                    <div className="my-4">
                      <label htmlFor="excersice_2_sets" className=" text-left block text-sm font-medium text-gray-700">
                        {`Sets: ${input.excersice_2_sets}`}
                      </label>
                      <div className="mt-1">
                        <div>
                          <input
                            type="range"
                            name="excersice_2_sets"
                            id="excersice_2_sets"
                            list="tickmarks"
                            min="0"
                            max="10"
                            className="w-full appearance-none bg-gray-300 rounded-lg text-purple-800"
                            onChange={(e) => handleChange(e)}
                          />
                          <datalist id="tickmarks">
                            <option value="0"></option>
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value="3"></option>
                            <option value="4"></option>
                            <option value="5"></option>
                            <option value="6"></option>
                            <option value="7"></option>
                            <option value="8"></option>
                            <option value="9"></option>
                            <option value="10"></option>
                          </datalist>
                        </div>
                      </div>
                    </div>
                    <div className="mb-8">
                      <div className="flex justify-between">
                        <div className="relative border w-[25%] border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label
                            htmlFor="excersice_2_min_reps"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                          >
                            Reps Min
                          </label>
                          <input
                            type="number"
                            pattern="\d*"
                            name="excersice_2_min_reps"
                            id="excersice_2_min_reps"
                            onChange={(e) => handleChange(e)}
                            className="block w-full border-0 p-0 text-gray-900  focus:ring-0 sm:text-sm"
                            placeholder="8"
                          />
                        </div>
                        <div className="relative border w-[25%] border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label
                            htmlFor="excersice_2_max_reps"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                          >
                            Reps Max
                          </label>
                          <input
                            type="number"
                            pattern="\d*"
                            name="excersice_2_max_reps"
                            id="excersice_2_max_reps"
                            onChange={(e) => handleChange(e)}
                            className="block w-full border-0 p-0 text-gray-900 focus:ring-0 sm:text-sm"
                            placeholder="12"
                          />
                        </div>
                        <div className="relative border w-[25%] border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label
                            htmlFor="excersice_2_weight"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                          >
                            weight
                          </label>
                          <input
                            type="number"
                            pattern="\d*"
                            name="excersice_2_weight"
                            id="excersice_2_weight"
                            onChange={(e) => handleChange(e)}
                            className="block w-full border-0 p-0 text-gray-900 focus:ring-0 sm:text-sm"
                            placeholder="25"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </ModalComponent>
    </div>
  );
};

export default DynamicModal;
