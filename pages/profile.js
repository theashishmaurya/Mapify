import { useUser } from "@auth0/nextjs-auth0";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import firebase from "../firebase/clientApp";
import Modal from "./components/postModal/Modal";
import router from "next/router";
export default function Profile() {
  const { user, error, isLoading } = useUser();
  const db = firebase.firestore();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  useEffect(async () => {
    if (!isLoading) {
      await db
        .collection("roadmap")
        .where("user", "==", user.sub)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setPosts((post) => [
              ...post,
              { id: doc.id, title: doc.data().title },
            ]);
          });
        })
        .catch((err) => console.log(err));
    }
    return () => {
      setPosts([]);
    };
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className=''>
        <div className='user-container'>
          <div className='bg-black w-full h-80 '>
            <div
              className='z-2 p-4 cursor-pointer'
              onClick={() => router.back()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='white'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                />
              </svg>
            </div>
            <div className='relative top-48	'>
              <div className='user-card flex justify-center'>
                <div className='card  '>
                  <img
                    src={user.picture}
                    alt='user-profile pic'
                    className='rounded-full border-2'
                  />
                  <div className='flex justify-center text-xl font-medium'>
                    {user.nickname}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='post-container my-40 mx-10'>
          <div className='flex justify-center text-4xl font-bold'>RoadMaps</div>
          <div className='card grid grid-cols-2 justify-items-center  m-6 gap-10'>
            {posts.map((data) => {
              const path = `/view/${data.id}`;
              return (
                <div
                  className='w-full h-30  m-6 grid grid-cols-2 shadow-md rounded-md mx-4 hover:scale-105'
                  key={data.id}
                >
                  <div className=' justify-start p-4 text-xl font-bold'>
                    <div> {data.title}</div>
                  </div>

                  <div className=' flex justify-end m-2'>
                    <Link href={path}>
                      <button className='bg-white text-black shadow-md py-2 mx-2 px-4 items-center rounded-lg'>
                        View
                      </button>
                    </Link>
                    <button
                      className='bg-blue-600 text-white border-2 shadow-md py-2 px-4 items-center rounded-lg'
                      onClick={() => {
                        setShowModal(true);
                        setPostId(data.id);
                        console.log(postId);
                      }}
                    >
                      Post
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {showModal ? (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            postId={postId}
          />
        ) : null}
        {/* <Modal /> */}
      </div>
    )
  );
}
