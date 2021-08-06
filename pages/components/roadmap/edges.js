import React, { useContext } from "react";
import Image from "next/image";
import smoothstep from "../../../public/image/smoothstep.png";
import bezier from "../../../public/image/default.png";
import straight from "../../../public/image/line.png";
import { RoadmapContext } from "../../api/roadmap/roadmapContext";
const Card = ({ img }) => {
  return (
    <div className='flex justify-center items-center bg-gray-100 border-2 rounded-md  p-4  cursor-pointer'>
      <Image src={img} width={80} height={80} />
    </div>
  );
};
const styles = {
  borderColor: "#0099ff",
  borderStyle: "solid",
  borderWidth: "2px",
};

const Edges = () => {
  const [roadmapData, setRoadmapData] = useContext(RoadmapContext);
  const handleOnClick = (name) => {
    const newData = {
      data: roadmapData.data,
      background: roadmapData.background,
      edgeType: name,
    };
    setRoadmapData(newData);
  };
  return (
    <div className='edges flex justify-arround '>
      <div
        className='rounded-md m-2'
        onClick={() => {
          handleOnClick("smoothstep");
        }}
        style={styles}
      >
        <Card img={smoothstep} />
      </div>
      <div
        className='rounded-md m-2'
        onClick={() => {
          handleOnClick("default");
        }}
      >
        <Card img={bezier} />
      </div>
      <div
        className='rounded-md m-2'
        onClick={() => {
          handleOnClick("straight");
        }}
      >
        <Card img={straight} />
      </div>
    </div>
  );
};
export default Edges;
