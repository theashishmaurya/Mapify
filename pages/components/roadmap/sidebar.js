import React, { useContext, useState } from "react";
import { toPng } from "html-to-image";
import { RoadmapContext } from "../../api/roadmap/roadmapContext";
import { ChromePicker, CompactPicker, TwitterPicker } from "react-color";
import Edges from "./edges";
import Image from "next/image";
import colorWheel from "../../../public/image/color.png";
export default function Sidebar({ canvasRef }) {
  const onDragStart = (event, nodeData) => {
    event.dataTransfer.setData("application/reactflow", nodeData);
    event.dataTransfer.effectAllowed = "move";
  };

  const [roadmapData, setRoadmapData] = useContext(RoadmapContext);
  console.log(roadmapData, "from sidebar");
  const [detail, setDetail] = useState("Drag me");
  const handleOnChange = (e) => {
    setDetail(e.target.value);
  };

  const onSaveImage = () => {
    if (canvasRef.current === null) {
      console.log("null");
      return;
    }
    toPng(canvasRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-Roadmap.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ////////////////////Color picker functions /////////////////////////////
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    background: "#fff",
  });
  const handleColorChange = (col) => {
    setColor({ background: col.hex });
    console.log(color);
  };
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  return (
    <div className=' min-h-full'>
      <div className='mx-2'>
        <div className='description font-bold text-xl mb-2 pt-2'>
          You can drag the nodes to the pane on the right.
        </div>
        <div className='bg-gray-100 cursor-pointer py-4 flex justify-center border-2 border-gray-200 dot'>
          <div
            className='border-2 border-black p-4 my-4 w-36 text-md  flex aling-center justify-center font-medium rounded-md'
            style={{ background: color.background }}
            onDragStart={(event) => {
              onDragStart(event, detail);
              setDetail("Drag me");
            }}
            draggable
          >
            {detail}
          </div>
        </div>
        <form action='submit'>
          <div className='input'>
            <div className='my-2'>
              <label htmlFor='input' className='font-medium '>
                Add description
              </label>
            </div>
            <input
              className='border-2 border-gray-400 rounded-lg  w-full p-2 '
              type='text'
              name='node'
              placeholder='Type something'
              value={detail}
              onChange={handleOnChange}
            />
          </div>
        </form>
      </div>
      {/* <div
        className='flex justify-center my-4 p-8 m-2 border-2 border-gray-400 rounded-xl '
        // style={{ background: color.background }}
      >
        <CompactPicker color={color} onChangeComplete={handleColorChange} />
      </div> */}
      <div className='m-2'>
        <button
          onClick={handleClick}
          className='min-h-full w-8 h-8 rounded-full '
          // style={{ background: color.background }}
        >
          <Image src={colorWheel} alt='color-wheel' />
        </button>
        {displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={handleClose} />
            <TwitterPicker color={color} onChangeComplete={handleColorChange} />
          </div>
        ) : null}
        {/* <TwitterPicker color={color} onChangeComplete={handleColorChange} /> */}
      </div>
      <div>
        <Edges />
      </div>

      <footer className='flex justify-end'>
        <button
          className='border-2 border-black px-4 py-2 rounded-md text-white font-medium bg-black flex justify-end'
          onClick={onSaveImage}
        >
          Download
        </button>
      </footer>
    </div>
  );
}

/* <div className='grid grid-cols-4 gap-4'>
      <div className='bg-gray-200 min-h-screen min-w-min col-span-3 border-2 border-black'>
        <ReactFlow elements={initialElements} onLoad={onLoad}>
          <Controls />
        </ReactFlow>
      </div>
      <div>This is new div</div>
    </div> */
