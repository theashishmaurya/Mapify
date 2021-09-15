import Head from 'next/head';
import Navbar from '../components/LandingPage/Navbar';
import Image from 'next/image';
import homeImage from '../public/image/mainpage.png';
import Link from 'next/link';
import React, { useEffect } from 'react';
import About from '../components/LandingPage/about';
import Swal from 'sweetalert2';

export default function Home() {
  useEffect(() => {
    if (window.matchMedia('(max-width:1024px)').matches) {
      Swal.fire({
        title: 'Mapify is most Optimal for Desktop deviecs',
        titleText:
          'Seems like your are using device with >1024 widht,Mapify is most Optimal for Desktop deviecs',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
  });
  return (
    <div>
      <div className="container mx-auto md:px-20 px-6 md:mb-4 max-h-screen">
        <Head>
          <title>Welcome</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <header>
          <div>
            <Navbar />
          </div>
        </header>
        <main className="container mx-auto xl:my-4 items-center ">
          <div className="grid grid-rows-2  lg:grid-rows-1 lg:grid-cols-2 md:gap-4 ">
            <div className="">
              <div className="font-bold text-4xl lg:text-6xl md:mt-10 mb-10 leading-tight ">
                <section>
                  Create Roadmaps or flowcharts Easily with Mapify.
                </section>
              </div>
              <div className="text-lg text-gray-600 m-2 my-4">
                <p>
                  Make Roadmaps and flowcharts, share them with others or embed
                  them in your website. Post your Roadmaps to our community to
                  get reviews and suggestions.
                </p>
              </div>
              <div className="buttons my-10">
                <Link href="/api/auth/login">
                  <button className="border-2 border-black text-white font-bold bg-black p-4 rounded-md my-4 mr-4">
                    Start Creating
                  </button>
                </Link>
                {/* <div className="overflow-hidden relative h-0 pb-10">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/mmCfYMzsnH4"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    className="left-0 top-0 h-full w-full absolute"
                  ></iframe>
                </div> */}
                <button
                  className="border-2 border-black p-4 font-bold rounded-md "
                  onClick={() => {
                    Swal.fire({
                      html: ' <iframe width="100%" height="450" src="https://www.youtube.com/embed/mmCfYMzsnH4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                      padding: 8,
                      width: '100%',
                      showConfirmButton: false,
                      background: '#000',
                    });
                  }}
                >
                  <div className="flex items-center">Watch video</div>
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center row-start-1 row-end-2 lg:col-start-2">
              <Image src={homeImage} alt="Illustration of Home pic" />
            </div>
          </div>
        </main>
        <div className="flex justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 animate-bounce	"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <About />

        <footer className="flex items-center justify-center w-full h-24 border-t">
          <a
            className="flex items-center justify-center"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="h-4 ml-2 "
              width={60}
              height={60}
            />
          </a>
        </footer>
      </div>
    </div>
  );
}
