import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
      <div className="navbar grid grid-cols-3 tracking-wide my-2">
        <div className="logo flex justify-start">
          <h3 className="font-extrabold text-3xl ">
            <Link href="/">Mapify</Link>
          </h3>
        </div>
        <div className="navs flex justify-center font-bold  p-2 hidden lg:flex">
          <div className="mx-2">
            <Link href="/roadmaps">Roadmap</Link>
          </div>
          <div className="mx-2">
            <Link href="/resources">Resources+</Link>
          </div>
          <div className="mx-2">
            <Link href="/guide">Guide</Link>
          </div>
        </div>
        <div className="flex justify-end font-bold px-2 flex content-end col-start-3  ">
          <div className="login-button py-2 mx-2 hidden md:flex">
            <Link href="/api/auth/login">Log in</Link>
          </div>
          <Link href="/api/auth/login">
            <button className="button font-medium text-xs md:text-sm text-white bg-black border rounded-md p-2 px-2  md:px-4 mx-2">
              Try for free
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
