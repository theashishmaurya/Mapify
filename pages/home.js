import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";
import Navbar from "./components/home/Navbar";
import banner from "../public/image/baner.png";
import Image from "next/image";
import Card from "./components/home/card";
import firebase from "../firebase/clientApp";
import Link from "next/link";
import dummy from "../public/image/mainpage.png";

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
            {posts.map((post) => {
              const path = `/post/${post.Postid}`;
              return (
                <div key={post.Postid}>
                  <Link href={`/post/${post.Postid}`}>
                    {/* <Card title={post.title} description={post.description} /> */}
                    <div className=' bg-gray-200 rounded-xl p-8 md:p-0 hover:bg-gray-600 cursor-pointer hover:text-white hover:scale-105 mb-10'>
                      <div className='p-2 rounded-md'>
                        <Image
                          className='w-32 h-32 mx-auto rounded-md'
                          src={dummy}
                          alt='Cover-image'
                        />
                      </div>

                      <div className='pt-6 md:p-8 space-y-4'>
                        <p className='text-lg font-bold  text-center'>
                          {post.title}
                        </p>
                        <p className='text-lg '>{post.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
