import React from 'react';

const Loader = () => {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="flex">
          <div className="text-8xl font-bold mx-2 motion-safe:animate-pulse ">
            .
          </div>
          <div className="text-8xl font-bold mx-2  animate-pulse motion-reduce:animate-pulse ">
            .
          </div>
          <div className="text-8xl font-bold mx-2  motion-reduce:animate-pulse animate-pulse">
            .
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
