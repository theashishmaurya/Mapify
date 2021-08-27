import React, { useContext } from "react";
import Image from "next/image";
import smoothstep from "../../../public/image/smoothstep.png";
import bezier from "../../../public/image/default.png";
import straight from "../../../public/image/line.png";
import { RoadmapContext } from "../../api/roadmap/roadmapContext";
import { useState } from "react";
const Card = ({ img }) => {
  return (
    <div className='flex justify-center items-center  rounded-md  p-4  shadow-md cursor-pointer'>
      <Image src={img} width={80} height={80} draggable='false' />
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
    for (const property in style) {
      if (property == name) {
        console.log(property, style[property]);
        style[property] = styles;
      } else {
        style[property] = null;
      }
    }
    const newData = {
      data: roadmapData.data,
      background: roadmapData.background,
      edgeType: name,
    };
    setRoadmapData(newData);
  };
  const [style, setStyle] = useState({
    smoothstep: null,
    default: null,
    straight: null,
  });
  return (
    <div className='edges flex justify-arround'>
      <div
        className='rounded-md m-2'
        onClick={() => {
          handleOnClick("smoothstep");
        }}
        style={style.smoothstep}
      >
        <Card img={smoothstep} />
      </div>
      <div
        className='rounded-md m-2'
        onClick={() => {
          handleOnClick("default");
        }}
        style={style.default}
      >
        <Card img={bezier} />
      </div>
      <div
        className='rounded-md m-2'
        onClick={() => {
          handleOnClick("straight");
        }}
        style={style.straight}
      >
        <Card img={straight} />
      </div>
    </div>
  );
};
export default Edges;
