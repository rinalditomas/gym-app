import React from 'react'

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
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
  );
}

export default Loading;