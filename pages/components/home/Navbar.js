import Link from "next/link";
import uuidstring from "../roadmap/api/uuidstring";
const Navbar = (props) => {
  const { user, error, isLoading } = props;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  // const createRoute = `/create/${user.sub}`;
  const createRoute = uuidstring();
  console.log(createRoute);

  return (
    <div className='bg-black'>
      <div className='navbar  text-white grid grid-cols-3 tracking-wide  py-2 container mx-auto'>
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
            <div className='border-2 border-gray-600 rounded-full flex items-center justify-center cursor-pointer	 px-2 py-1'>
              <span className='mx-2'> {user.nickname}</span>
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
