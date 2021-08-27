import React from 'react';
import Navbar from './components/LandingPage/Navbar';

const LeftImageGrid = () => {
  return <div></div>;
};

const Guide = () => {
  return (
    <div>
      <div className="md:mx-20 md:px-20">
        <Navbar />

        <div className="text-5xl font-bold md:m-20  md:px-20 flex justify-center">
          Welcome to Mapify
        </div>
        <div className="text-2xl font-bold flex justify-center">
          Instructions to use
        </div>
      </div>
    </div>
  );
};

export default Guide;
