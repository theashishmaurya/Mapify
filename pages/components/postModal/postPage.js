import { useUser } from "@auth0/nextjs-auth0";
import { info } from "autoprefixer";
import React, { useEffect, useState } from "react";
import firebase from "../../../firebase/clientApp";
import Navbar from "../home/Navbar";
import View from "../roadmap/view";

const PostPage = ({ pid }) => {
  const [postData, setPostData] = useState(null);
  const db = firebase.firestore();
  const { user, isloading, error } = useUser();
  const [isloadingDoc, setIsLoadingDoc] = useState(true);

  let docData;
  useEffect(async () => {
    if (pid !== undefined) {
      console.log(pid);

      await db
        .collection("posts")
        .doc(`${pid}`)
        .get()
        .then((doc) => {
          setPostData(doc.data());
          console.log(doc.data());
          let html = doc.data().description;
          let docData = new window.DOMParser().parseFromString(
            html,
            "text/html"
          );
          setPostData({
            ...postData,
            description: docData.documentElement.innerHTML,
          });
          console.log(docData.documentElement.innerHTML);

          setIsLoadingDoc(false);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("PID loading");
    }
    return () => info();
  }, [pid]);
  let html = <div>Ashish</div>;
  return (
    <div>
      <Navbar />
      {!isloadingDoc && (
        <div className='container mx-auto overflow-x-hidden	'>
          <div className='text-5xl  font-bold mx-auto my-20 container flex justify-center'>
            {postData.title}
          </div>

          <div className=' mx-auto border shadow-md'>
            <View docid={postData.roadmapId} />
          </div>
          <div
            className='my-10 mx-20 .leading-relaxed

'
          >
            <div
              dangerouslySetInnerHTML={{ __html: postData.description }}
            ></div>

            {/* {postData.description} */}
          </div>
          <div className='mx-20 flex items-center m-4 mb-20 '>
            {/* <img src={user.picture} alt='' className='rounded-full w-8 h-8 ' /> */}
            <span className='text-gray-600 mx-2 '>
              {" "}
              <span className='font-bold'> by : </span>
              {user.nickname}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
