/* eslint-disable react/display-name */
import React from "react";
import { Dialog } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";


export const NewWorkOut = ({handleChange}) => {
  return (
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
  );
}
export const NewPlan = ({handleChange}) => {
  return (
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
  );
}
