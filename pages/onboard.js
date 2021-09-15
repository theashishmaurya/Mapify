import Image from 'next/image';
import { useState } from 'react';
import Switch from '../components/onboard/switch';
import mindMap from '../public/image/new.png';
export default function Onboard() {
  const [activeScreen, setActiveScreen] = useState('Log In');
  return (
    <div className="h-screen overflow-hidden">
      <div className=" grid md:grid-cols-2 grid-cols-1 h-screen">
        <div className="hidden md:block  md:p-20 flex my-auto">
          <Image src={mindMap} alt="Mind Map Picture" layout="responsive" />
        </div>
        <div>
          <div className="md:p-20 p-4 h-screen">
            <div className="flex border-1 shadow-xl h-full md:px-8 md:py-4 py-2 px-4 rounded-xl">
              <div className="flex-grow ">
                <Switch text={activeScreen} />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
