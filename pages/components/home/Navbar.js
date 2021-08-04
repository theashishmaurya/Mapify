import Link from "next/link";
import Image from "next/image";
import userImage from "../../../public/image/mainpage.png";
const Navbar = () => {
  return (
    <div className='bg-black py-2'>
      <div className='navbar grid grid-cols-3 tracking-wide text-white py-2 container mx-auto'>
        <div className='logo flex justify-start'>
          <h3 className='font-extrabold text-3xl'>Mapify</h3>
        </div>
        <div className='navs flex justify-center justify-between font-bold  p-2'>
          <div className='mx-2'>
            <Link href='/home'>Home</Link>
          </div>
          <div className='mx-2'>
            <Link href='/dashboard'>Dashboard</Link>
          </div>
          <div className='mx-2'>
            <Link href='/createroadmap'>Create+</Link>
          </div>
        </div>
        <div className='flex justify-end font-bold px-2 flex content-end'>
          <Link href='/'>
            <div className='border-2 border-gray-200 rounded-full flex items-center justify-center cursor px-2 py-1'>
              <span className='mx-2'>Username</span>

              <Image
                src={userImage}
                alt='Userimage'
                width={32}
                height={32}
                className='rounded-full'
              />
            </div>
          </Link>

          <Link href='/api/auth/logout'>
            <button className='button font-medium text-sm text-white bg-black border rounded-md p-2 px-4 mx-4'>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
