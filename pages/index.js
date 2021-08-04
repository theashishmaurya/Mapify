import Head from "next/head";
import Navbar from "./components/home/Navbar";
import Image from "next/image";
import homeImage from "../public/image/mainpage.png";
import Link from "next/link";
export default function Home() {
  return (
    <div className='container mx-auto my-4 max-h-screen'>
      <Head>
        <title>Welcome</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <div>
          <div className='navbar grid grid-cols-3 tracking-wide my-2'>
            <div className='logo flex justify-start'>
              <h3 className='font-extrabold text-3xl'>Mapify</h3>
            </div>
            <div className='navs flex justify-center font-bold  p-2'>
              <div className='mx-2'>
                <Link href='/roadmaps'>Roadmap</Link>
              </div>
              <div className='mx-2'>
                <Link href='/resources'>Resources+</Link>
              </div>
              <div className='mx-2'>
                <Link href='/about'>About</Link>
              </div>
            </div>
            <div className='flex justify-end font-bold px-2 flex content-end'>
              <div className='login-button py-2 mx-2'>
                <Link href='/api/auth/login'>Log in</Link>
              </div>
              <Link href='/api/auth/login'>
                <button className='button font-medium text-sm text-white bg-black border rounded-md p-2 px-4 mx-2'>
                  Try for free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className='container mx-auto my-4 xl:my-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className=''>
            <div className='font-bold text-6xl m-2 my-10 leading-tight'>
              <section>
                Create Roadmaps or flowcharts Easily with Mapify.
              </section>
            </div>
            <div className='text-lg text-gray-600 m-2 my-4'>
              <p>
                Make Roadmaps and flowcharts, share them with others or embed
                them in your website. Post your Roadmaps to our community to get
                reviews and suggestions.
              </p>
            </div>
            <div className='buttons my-10'>
              <Link href='/api/auth/login'>
                <button className='border-2 border-black text-white font-bold bg-black p-4 rounded-md my-4 mr-4'>
                  Start Creating
                </button>
              </Link>
              <Link href='/api/auth/login'>
                <button className='border-2 border-black p-4 font-bold rounded-md ml-2'>
                  Watch video
                </button>
              </Link>
            </div>
          </div>
          <div className=''>
            <Image src={homeImage} alt='Illustration of Home pic' />
          </div>
        </div>
      </main>

      <footer className='flex items-center justify-center w-full h-24 border-t'>
        <a
          className='flex items-center justify-center'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <img src='/vercel.svg' alt='Vercel Logo' className='h-4 ml-2' />
        </a>
      </footer>
    </div>
  );
}
