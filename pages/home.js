import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import Navbar from "./components/home/Navbar";
import banner from "../public/image/baner.png";
import Image from "next/image";
import Card from "./components/home/card";
export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  return (
    <div>
      <Navbar user={user} error={error} isLoading={isLoading} />
      <div>
        <Image src={banner} alt='hoome-banner' />
      </div>
      <header className='flex justify-center my-20'>
        <div>
          <h1 className='text-4xl font-bold'>Mapify Roadmaps</h1>
        </div>
      </header>
      <main className='container mx-auto'>
        <div className='grid grid-cols-3'>
          <div className='col-span-2  grid grid-cols-2 gap-4'>
            <Card />

            <Card />
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
