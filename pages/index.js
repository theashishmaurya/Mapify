import Head from "next/head";
import Navbar from "./components/LandingPage/Navbar";
import Image from "next/image";
import homeImage from "../public/image/mainpage.png";
import Link from "next/link";
export default function Home() {
  return (
    <div className='container mx-auto px-20 my-4 max-h-screen'>
      <Head>
        <title>Welcome</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <div>
          <Navbar />
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
          <Image
            src='/vercel.svg'
            alt='Vercel Logo'
            className='h-4 ml-2'
            width={60}
            height={60}
          />
        </a>
      </footer>
    </div>
  );
}
