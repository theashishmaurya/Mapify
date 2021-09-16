import Image from 'next/image';
import { useState } from 'react';
import Login from '../components/onboard/logInform';
import SignUp from '../components/onboard/signUpform';
import Switch from '../components/onboard/switch';
import mindMap from '../public/image/new.png';

export default function Onboard() {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <div className="overflow-hidden h-full">
      <div className=" grid md:grid-cols-2 grid-cols-1 h-full  xl:gap-x-40 gap-x-10">
        <div className="hidden lg:block  md:p-20 flex my-auto">
          <Image src={mindMap} alt="Mind Map Picture" layout="responsive" />
        </div>
        <div>
          <div className="md:p-10 md:px-20 flex flex-col">
            <div className=" border-1 shadow-xl md:px-8 md:py-4 py-2 px-4 rounded-xl h-full">
              <div className="my-2">
                <Switch isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
              </div>
              <div className="my-4 h-full">
                {isSignUp ? <SignUp /> : <Login />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
