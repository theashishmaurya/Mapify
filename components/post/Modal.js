import React, { useState } from 'react';
import firebase from '../../firebase/clientApp';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // ES6
import Swal from 'sweetalert2';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Modal = ({ setShowModal, postId }) => {
  // const [postData, setPostData] = useContext(PostContext);
  // console.log(postData, postId);
  console.log(postId);
  const db = firebase.firestore();
  const [temp, setTemp] = useState({
    title: '',
    description: '',
  });
  // const { user, isLoading, error } = useUser();
  console.log(postId);

  const handleChange = (name) => (e) => {
    console.log(name);
    setTemp({ ...temp, [name]: e.target.value });
    console.log(temp);
  };
  const handleDescriptionChange = (value) => {
    setTemp({ ...temp, description: value });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    await db
      .collection('posts')
      .where('roadmapId', '==', `${postId}`)
      .get()
      .then(async (snapshot) => {
        console.log(snapshot.empty);
        if (snapshot.empty) {
          await db
            .collection('posts')
            .doc(uuidv4())
            .set({
              title: temp.title,
              description: temp.description,
              comments: [],
              votes: 0,
              user: user,
              roadmapId: postId,
              createdAt: new Date(),
              tags: [],
            })
            .then(() =>
              Swal.fire({
                title: 'Successfull',
                text: 'Your post posted Successfully!',
                icon: 'success',
                confirmButtonText: 'ok',
              })
            )

            .catch((err) => console.log(err));
        } else {
          Swal.fire({
            title: 'Post Already exists',
            icon: 'warning',
            confirmButtonText: 'ok',
          });
        }
      })
      .catch((err) => console.log(err));

    setShowModal(false);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none  focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl w-2xl w-1/2">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Create Post</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                <input
                  className="focus:outline-none border-b-2 w-full"
                  type="text"
                  id="posst-title"
                  name="post-title"
                  placeholder="Title"
                  onChange={handleChange('title')}
                />{' '}
                <br></br>
                <div className="my-4">
                  <ReactQuill
                    className="h-40"
                    value={temp.description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t mt-10 border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handlePostSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
