import React, { useEffect, useState } from 'react';
import Navbar from './components/LandingPage/Navbar';
import Head from 'next/head';
import dummy from '../public/image/mainpage.png';
import firebase from '../firebase/clientApp';
import Link from 'next/link';
import Image from 'next/image';
import Embed from './components/roadmap/embed';
const Card = ({ title, description, Postid, votes, author, roadmapId }) => {
  return (
    <div className="border shadow-md rounded-xl hover:scale-105 mb-10 w-full duration-100 p">
      <div className="p-2 rounded-md">
        <div style={{ pointerEvents: 'none' }}>
          <Embed docid={roadmapId} />
        </div>
      </div>
      <div className="pt-6 md:p-8 space-y-4 ">
        <p className="text-lg font-bold  text-center">{title}</p>

        <p
          className="text-lg line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
        <div className="grid grid-cols-2">
          <Link href={`/post/${Postid}`}>
            <div>
              <button className="bg-blue-600 text-white shadow-md py-2 px-4 items-center rounded-lg">
                View
              </button>
            </div>
          </Link>
          <div className="flex justify-end items-center">
            <div className="font-bold mx-1">{votes}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 "
              viewBox="0 0 20 20"
              fill="red"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
const Roadmaps = () => {
  const [topPost, setTopPost] = useState([]);
  const db = firebase.firestore();
  useEffect(async () => {
    await db
      .collection('posts')
      .orderBy('votes', 'desc')
      .limit(4)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const newData = { ...doc.data(), postId: doc.id };
          setTopPost((topPosts) => [...topPosts, newData]);
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="px-20 mx-20">
      <Head>
        <title>Roadmaps</title>
        <meta />
      </Head>
      <Navbar />
      <div className="my-10">
        <div className="my-4 mt-20 flex justify-center items-center text-3xl md:text-6xl font-bold">
          Top Roadmaps 🔥
        </div>
        <div className="grid grid-cols-1  gap-6 md:my-20 my-10 px-20">
          {topPost.map((data, index) => {
            return (
              <div key={data.postId}>
                <Card
                  title={data.title}
                  description={data.description}
                  Postid={data.postId}
                  author={data.user.name}
                  votes={data.votes}
                  roadmapId={data.roadmapId}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
