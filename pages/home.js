import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";
import Navbar from "./components/home/Navbar";
import banner from "../public/image/baner.png";
import Image from "next/image";
import Card from "./components/home/card";
import firebase from "../firebase/clientApp";
export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  const [posts, setPosts] = useState([]);
  const db = firebase.firestore();

  useEffect(async () => {
    await db
      .collection("posts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const newData = { ...doc.data(), Postid: doc.id };
          setPosts((post) => [...post, newData]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
