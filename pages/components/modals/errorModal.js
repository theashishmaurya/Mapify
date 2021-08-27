import React from "react";

export default function Error({ error, setShowModal, showModal }) {
  console.log(showModal);
  console.log("working");
  return (
    <div>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none '>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  focus:outline-none'>
            {/*header*/}
            <div className='bg-red-600 rounded-t-md'>
              {" "}
              <button
                className='p-1 ml-auto text-black flex justify-end text-3xl font-semibold'
                onClick={() => {
                  setShowModal(false);
                  console.log("something happened");
                }}
              >
                <span className=' text-black text-2xl block '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 z-4'
                    fill='#000'
                    viewBox='0 0 24 24'
                    stroke='#fff'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div className='flex  justify-center p-5 border-b border-solid border-blueGray-200  bg-red-600 min-h-1/3'>
              <div className='flex justify-center'>
                <h3 className='text-3xl font-semibold '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-32 w-32'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='#fff'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </h3>
              </div>
            </div>
            {/*body*/}
            <div className='relative p-6 flex-auto'>
              <p className='my-4 text-blueGray-500 text-5xl flex justify-center leading-relaxed'>
                Opps!
              </p>
              <p className='my-4 text-blueGray-500 text-xl flex justify-center leading-relaxed'>
                Something went wrong, {error}. Try Again later.
              </p>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-center p-6 rounded-b '>
              <button
                className='text-red-500 background-transparent font-bold flex justify-center uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </div>
  );
}
