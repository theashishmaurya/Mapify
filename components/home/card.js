import Image from "next/image";
import dummy from "../../../public/image/mainpage.png";

const Card = ({ title, description }) => {
  return (
    <div className=' bg-gray-200 rounded-xl p-8 md:p-0 hover:bg-gray-600 cursor-pointer hover:text-white hover:scale-105 mb-10'>
      <div className='p-2 rounded-md'>
        <Image
          className='w-32 h-32 mx-auto rounded-md'
          src={dummy}
          alt='Cover-image'
        />
      </div>

      <div className='pt-6 md:p-8 space-y-4'>
        <p className='text-lg font-bold  text-center'>{title}</p>
        <p className='text-lg '>{description}</p>
      </div>
    </div>
  );
};

export default Card;
