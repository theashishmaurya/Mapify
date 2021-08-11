import React from "react";

const Modal = ({ setShowModal }) => {
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>Create Post</h3>
            </div>
            {/*body*/}
            <div className='relative p-6 flex-auto'>
              <p className='my-4 text-blueGray-500 text-lg leading-relaxed'>
                <label for='title'>Title</label>
                <input
                  className='focus:outline-none border-b-2 w-full'
                  type='text'
                  id='posst-title'
                  name='post-title'
                />{" "}
                <br></br>
                <textarea className='resize border rounded-md w-full '></textarea>
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
                onClick={() => setShowModal(false)}
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
