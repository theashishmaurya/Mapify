import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import firebase from "../../../firebase/clientApp";
import { v4 as uuidv4 } from "uuid";

const Modal = ({ setShowModal, postId }) => {
  // const [postData, setPostData] = useContext(PostContext);
  // console.log(postData, postId);

  const db = firebase.firestore();
  const [temp, setTemp] = useState({
    title: "",
    description: "",
  });
  const { user, isLoading, error } = useUser();
  console.log(postId);

  const handleChange = (name) => (e) => {
    console.log(name);
    setTemp({ ...temp, [name]: e.target.value });
    console.log(temp);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    await db
      .collection("posts")
      .where("roadmapId", "==", `${postId}`)
      .get()
      .then(async (snapshot) => {
        console.log(snapshot.empty);
        if (snapshot.empty) {
          await db
            .collection("posts")
            .doc(uuidv4())
            .set({
              title: temp.title,
              description: temp.description,
              comments: [],
              votes: 0,
              userId: user.sub,
              roadmapId: postId,
            })
            .then(() => alert("your post has been successfully posted"))
            .catch((err) => console.log(err));
        } else {
          alert("Post already existed");
        }
      })
      .catch((err) => console.log(err));

    setShowModal(false);
  };
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none  focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl w-2xl w-1/2'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>Create Post</h3>
            </div>
            {/*body*/}
            <div className='relative p-6 flex-auto'>
              <p className='my-4 text-blueGray-500 text-lg leading-relaxed'>
                <input
                  className='focus:outline-none border-b-2 w-full'
                  type='text'
                  id='posst-title'
                  name='post-title'
                  placeholder='Title'
                  onChange={handleChange("title")}
                />{" "}
                <br></br>
                <textarea
                  className='resize border rounded-md w-full my-10 px-2 p-1 h-60'
                  placeholder='Enter Description Here'
                  onChange={handleChange("description")}
                ></textarea>
              </p>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className='bg-green-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={handlePostSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};

export default Modal;
