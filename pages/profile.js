import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import firebase from '../firebase/clientApp';
import Modal from '../components/post/Modal';
import router from 'next/router';
import PropTypes from 'prop-types';
import Loader from '../components/loader/loader';
import Swal from 'sweetalert2';

const Card = (props) => {
  const { id, path, title, setShowModal, setPostId, handleDelete } = props;
  const [show, setShow] = useState(false);
  let domain = window.location.hostname;
  if (domain === 'localhost') {
    domain = window.location.hostname + ':' + window.location.port;
  }
  return (
    <div className="w-full h-30  m-6 grid grid-cols-2 shadow-md  py-4 rounded-md mx-4 hover:scale-105 duration-100	">
      <div className=" justify-start p-4 text-xl font-bold">
        <div> {title}</div>
      </div>

      <div className=" flex justify-end m-2">
        <Link href={path}>
          <button className="bg-white text-black shadow-md py-2 mx-2 px-4 items-center rounded-lg">
            View
          </button>
        </Link>
        <button
          className="bg-blue-600 text-white shadow-md py-2 px-4 items-center rounded-lg relative inline-block"
          onClick={() => {
            setShowModal(true);
            setPostId(id);
          }}
        >
          Post
        </button>
        <div className="relative inline-block">
          <div
            className="flex items-center mx-2 cursor-pointer"
            onClick={() => {
              setShow(!show);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 mt-2 flex items-center z-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </div>
          {show && (
            <div className="absolute min-w-20 shadow-md bg-white my-2 z-3 opacity-100 rounded-md bg-white">
              <button
                className="flex p-4 font-medium block hover:text-white hover:bg-black w-full"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `<iframe src="https://${domain}/embed/${id}" title="Mapify" width = "100%" height = "600"></iframe>`
                  );
                  setShow(!show);
                  Swal.fire({
                    title: 'Copied',
                    text: 'Copied Successfully!',
                    icon: 'success',
                    confirmButtonText: 'ok',
                  });
                }}
              >
                Embed
              </button>
              <button
                className="flex p-4 font-medium  block hover:text-white hover:bg-black w-full"
                onClick={() => {
                  navigator.clipboard.writeText(`${domain}/embed/${id}`);
                  setShow(!show);
                  Swal.fire({
                    title: 'Copied',
                    text: 'Copied Successfully!',
                    icon: 'success',
                    confirmButtonText: 'ok',
                  });
                }}
              >
                Share
              </button>
              <button
                className="flex p-4 font-medium block w-full text-white bg-red-600"
                onClick={() => {
                  handleDelete(id);
                  setShow(!show);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
Card.propTypes = {
  id: PropTypes.any,
  path: PropTypes.any,
  title: PropTypes.any,
  setShowModal: PropTypes.any,
  setPostId: PropTypes.any,
  handleDelete: PropTypes.any,
};

export default function Profile() {
  // const { user, error, isLoading } = useUser();
  const db = firebase.firestore();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  useEffect(async () => {
    await db
      .collection('roadmap')
      .where('user', '==', user.sub)
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

    return () => {
      setPosts([]);
    };
  }, []);

  const handleDelete = async (id) => {
    await db
      .collection('roadmap')
      .doc(id)
      .delete()
      .then(async () => {
        setPosts([]);
        await db
          .collection('roadmap')
          .where('user', '==', user.sub)
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
        Swal.fire({
          title: 'Roadmap Deleted Successfully!',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      })
      .catch((err) => console.log(err));
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="">
        <div className="user-container">
          <div className="bg-black w-full h-80 ">
            <div
              className="z-2 p-4 cursor-pointer inline-block"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            <div className="relative top-48	">
              <div className="user-card flex justify-center">
                <div className="card  ">
                  <img
                    src={user.picture}
                    alt="user-profile pic"
                    className="rounded-full h-40 w-40 border-2"
                  />
                  <div className="flex justify-center text-xl font-medium">
                    {user.nickname}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="post-container my-40 mx-10">
          <div className="flex justify-center text-4xl font-bold">RoadMaps</div>
          <div className="card grid grid-cols-2 justify-items-center  m-6 gap-10">
            {posts.map((data) => {
              const path = `/view/${data.id}`;

              return (
                <div key={data.id}>
                  <Card
                    id={data.id}
                    path={path}
                    title={data.title}
                    setShowModal={setShowModal}
                    setPostId={setPostId}
                    handleDelete={handleDelete}
                  />
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
      </div>
    )
  );
}
