import React from "react";
import Table from "./table";

const DayExtract = ({ history }) => {
  const { date, reps } = history;
  return (
    <div className="w-full px-8 py-4">
      <span className=" font-semibold text-gray-500">{new Date(history.date).toDateString()}</span>
      <Table history={history} />
    </div>
  );
};

export default DayExtract;
