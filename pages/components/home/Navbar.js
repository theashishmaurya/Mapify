import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import uuidstring from "../roadmap/api/uuidstring";
const Navbar = (props) => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  // const createRoute = `/create/${user.sub}`;
  const createRoute = uuidstring();
  console.log(createRoute);

  return (
    <div className='shadow-md'>
      <div className='navbar grid grid-cols-3 tracking-wide  py-2 container mx-auto'>
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
            <Link href={createRoute}>Create+</Link>
          </div>
        </div>
        <div className='flex justify-end font-medium px-2 flex content-end'>
          <Link href='/profile'>
            <div className='flex items-center justify-center cursor-pointer	 px-2 py-1'>
              <span className='mx-2'> {user.nickname}</span>
            </div>
          </Link>

          <Link href='/api/auth/logout'>
            <button className='button font-medium text-sm bg-white  p-2  mx-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
