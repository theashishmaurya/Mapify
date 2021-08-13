import React, { useEffect, useState } from "react";
import firebase from "../../../firebase/clientApp";
import Navbar from "../home/Navbar";
import View from "../roadmap/view";

const PostPage = ({ pid }) => {
  const [postData, setPostData] = useState(null);
  const db = firebase.firestore();
  const [isloading, setIsLoading] = useState(true);
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
          console.log(postData);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("PID loading");
    }
  }, [pid]);
  return (
    <div>
      <Navbar />
      {!isloading && (
        <div className='container mx-auto overflow-x-hidden	'>
          <div className='text-5xl mx-20 font-bold mx-auto my-20 container '>
            {postData.title}
          </div>
          <div className=' mx-20 bg-gray-200'>
            <View docid={postData.roadmapId} />
          </div>
          <div className='text-xl font-medium my-10 mx-20'>
            {postData.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
