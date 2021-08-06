import Image from "next/image";
import dummy from "../../../public/image/mainpage.png";

const Card = () => {
  return (
    <div className=' bg-gray-200 rounded-xl p-8 md:p-0 hover:bg-gray-600 cursor-pointer hover:text-white hover:scale-105 mb-10'>
      <div className='p-2 rounded-md'>
        <Image
          className='w-32 h-32 mx-auto rounded-md'
          src={dummy}
          alt='Cover-image'
        />
      </div>
      <div className='pt-6 md:p-8 space-y-4 text-center'>
        <p className='text-lg font-semibold '>
          Tailwind CSS is the only framework that I've seen scale on large
          teams. It’s easy to customize, adapts to any design, and the build
          size is tiny.
        </p>
        <figcaption className='font-medium'>
          <div className='text-cyan-600'>Sarah Dayan</div>
        </figcaption>
      </div>
    </div>
  );
};

export default Card;
