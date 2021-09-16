import { useState } from 'react';

function Switch({ isSignUp, setIsSignUp }) {
  const [toggle, setToggle] = useState(true);
  const toggleClass = ' transform translate-x-16 relative';
  return (
    //   Switch Container
    <div
      className="w-32 h-10  flex items-center bg-gray-300 rounded-full   cursor-pointer"
      onClick={() => {
        setToggle(!toggle);
        setIsSignUp(!isSignUp);
      }}
    >
      {/* Switch */}
      <div className="p-2 font-bold text-xs absolute">Log In</div>
      <div
        className={
          'bg-black w-16 h-10 h-full w-full rounded-full shadow-md transform duration-300 ease-in-out py-4 z-10 relative' +
          (toggle ? null : toggleClass)
        }
      ></div>
      <div className="p-2 py-4 font-bold text-xs relative z-0">Sign Up</div>
    </div>
  );
}

export default Switch;
