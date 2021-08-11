import { useUser } from "@auth0/nextjs-auth0";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import firebase from "../firebase/clientApp";
import Modal from "./components/postModal/Modal";
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
            <div className='relative top-60	'>
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
          <div className='card grid grid-cols-2 justify-items-center  m-6 gap-4'>
            {posts.map((data) => {
              const path = `/view/${data.id}`;
              return (
                <div
                  className='w-full h-30 border-2 m-6 grid grid-cols-2 shadow-md rounded-md hover:text-white hover:bg-black'
                  key={data.id}
                >
                  <Link href={path}>
                    <div className=' justify-start p-4 text-xl cursor-pointer font-bold'>
                      <div> {data.title}</div>
                    </div>
                  </Link>
                  <div className=' flex justify-end m-2'>
                    <button
                      className='bg-black text-white border-2 py-2 px-4 items-center rounded-lg'
                      onClick={() => {
                        setShowModal(true);
                        setPostId(data.id);
                        console.log(postId);
                      }}
                    >
                      post
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
