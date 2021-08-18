import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";
import Navbar from "./components/home/Navbar";
import banner from "../public/image/banner.png";
import Image from "next/image";
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
        {/*  */}
        <div className='grid grid-cols-2 gap-2 m-8'>
          <div className='flex items-center'>
            <h1 className='text-6xl font-bold drop-shadow-md '>
              Confused About which road to take ? Let's found a solution
              together.
            </h1>
          </div>
          <div>
            <Image src={banner} alt='home-banner' height={500} width={600} />
          </div>
        </div>
      </div>
      <header className='flex justify-center my-20'>
        <div>
          <h1 className='text-4xl font-bold'>Mapify Roadmaps</h1>
        </div>
      </header>
      <main className='container mx-auto'>
        <div className=''>
          <div className='grid grid-cols-1 gap-4 mx-60'>
            {posts.map((post) => {
              const path = `/post/${post.Postid}`;
              return (
                <div key={post.Postid}>
                  {/* <Card title={post.title} description={post.description} /> */}
                  <div className='border  shadow-md rounded-xl p-8 md:p-0  hover:scale-105 mb-10 grid grid-cols-2 gap-4 w-full'>
                    <div className='pt-6 md:p-8 space-y-4 '>
                      <p className='text-lg font-bold  text-center'>
                        {post.title}
                      </p>
                      <p
                        className='text-lg line-clamp-3'
                        dangerouslySetInnerHTML={{ __html: post.description }}
                      ></p>
                      <Link href={`/post/${post.Postid}`}>
                        <div>
                          {" "}
                          <button className='bg-blue-600 text-white shadow-md py-2 px-4 mt-24 items-center rounded-lg'>
                            View
                          </button>
                        </div>
                      </Link>
                    </div>
                    <div className='p-2 rounded-md'>
                      <Image
                        className='w-32 h-32 max-h-32 max-w-32 mx-auto rounded-md'
                        src={dummy}
                        alt='Cover-image'
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
      </main>
      <footer className='flex items-center justify-center w-full h-24 border-t'>
        <a
          className='flex items-center justify-center'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <img src='/vercel.svg' alt='Vercel Logo' className='h-4 ml-2' />
        </a>
      </footer>
    </div>
  );
}
