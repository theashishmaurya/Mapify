import Error from './components/modals/errorModal';
import Success from './components/modals/successModal';
import React from 'react';
import Loader from './components/loader/loader';
import Swal from 'sweetalert2';
import dashboard from '../public/image/dashboard.jpg';
import Image from 'next/image';
import Head from 'next/head';
import router from 'next/router';
const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Image src={dashboard} layout="fill" className="block" />
      <div className="absolute bg-black w-full h-screen bg-blend-overlay	bg-opacity-80">
        <div
          className="z-2 p-4 cursor-pointer inline-block"
          onClick={() => router.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center text-6xl text-gray-400 mt-80">
          Comming Soon...{' '}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
//
