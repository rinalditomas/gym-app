import React from 'react'

const Table = ({history}) => {
  return (
    <div className=" flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                >
                  Set Number
                </th>
                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  Reps
                </th>
                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  Weight
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {history.reps_super_set !== null ? (
                <>
                 { history.reps.map((reps, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                      {`Set Nº ${index + 1}`}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{reps}</td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{history.weight[index]}</td>
                  </tr>
                  ))}
                  { history.reps_super_set.map((reps, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                      {`Superset Nº ${index + 1}`}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{reps}</td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{history.weight_super_set[index]}</td>
                  </tr>
                  ))}
                </>
              ) : (
                history.reps.map((reps, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                      {`Set Nº ${index + 1}`}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{reps}</td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{history.weight[index]}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;