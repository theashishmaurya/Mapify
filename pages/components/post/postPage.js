import { info } from "autoprefixer";
import React, { useEffect, useState } from "react";
import firebase from "../../../firebase/clientApp";
import Navbar from "../home/Navbar";
import Embed from "../roadmap/embed";
import View from "../roadmap/view";

const PostPage = ({ pid }) => {
  const [postData, setPostData] = useState(null);
  const db = firebase.firestore();
  const [isloadingDoc, setIsLoadingDoc] = useState(true);
  useEffect(async () => {
    if (pid !== undefined) {
      console.log(pid);

      await db
        .collection("posts")
        .doc(`${pid}`)
        .get()
        .then((doc) => {
          // setPostData(doc.data());
          let html = doc.data().description;
          let docData = new window.DOMParser().parseFromString(
            html,
            "text/html"
          );
          setPostData({
            ...doc.data(),
            description: docData.documentElement.innerHTML,
          });
          console.log(doc.data().createdAt.toDate());

          setIsLoadingDoc(false);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("PID loading");
    }
    return () => info();
  }, [pid]);
  const [liked, setLiked] = useState(false);
  const handleOnLike = async () => {
    if (liked) {
      db.collection("posts")
        .doc(`${pid}`)
        .update({
          votes: firebase.firestore.FieldValue.increment(-1),
        })
        .then(() => {
          console.log("unliked");
          setPostData({ ...postData, votes: postData.votes - 1 });
        })
        .catch((err) => console.log(err));
    } else {
      await db
        .collection("posts")
        .doc(`${pid}`)
        .update({
          votes: firebase.firestore.FieldValue.increment(1),
        })
        .then(() => {
          console.log("Liked");
          setPostData({ ...postData, votes: postData.votes + 1 });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <Navbar />
      {!isloadingDoc && (
        <div className='container mx-auto'>
          <div className='text-5xl  font-bold mx-auto my-20 container mx-20'>
            {postData.title}
          </div>
          <div className='w-full px-20 '>
            <Embed docid={postData.roadmapId} className='border shadow-md' />
          </div>
          <div className='my-10 mx-20 leading-relaxed'>
            <div
              dangerouslySetInnerHTML={{ __html: postData.description }}
            ></div>

            {/* {postData.description} */}
          </div>
          <div className='grid grid-cols-2 mx-20'>
            <div className='flex my-4 '>
              <div className='flex items-center font-medium'>Author : </div>
              <div>
                <img
                  src={postData.user.picture}
                  alt='user picture'
                  className='w-8 h-8 rounded-full mx-2'
                />
              </div>
              <div className='flex items-center mx-1 text-gray-600'>
                {postData.user.name}
              </div>
              <div className='flex items-center text-gray-400'>
                {new Date(postData.createdAt.toDate()).toLocaleDateString(
                  "en-gb",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </div>
            </div>
            <div className='flex justify-end items-center'>
              <div className='text-gray-600 mx-2'>{postData.votes}</div>
              {liked ? (
                <svg
                  onClick={() => {
                    setLiked(!liked);
                    handleOnLike();
                    console.log("liked", liked);
                  }}
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  viewBox='0 0 20 20'
                  fill='red'
                >
                  <path
                    fillRule='evenodd'
                    d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => {
                    setLiked(!liked);
                    handleOnLike();
                    console.log("unliked", liked);
                  }}
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
