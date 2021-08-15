import React, { useContext, useState } from "react";
import { toPng } from "html-to-image";
import { RoadmapContext } from "../../api/roadmap/roadmapContext";
import { TwitterPicker } from "react-color";
import Edges from "./edges";
import Image from "next/image";
import colorWheel from "../../../public/image/color.png";

export default function Sidebar({ canvasRef, handleSave }) {
  const onDragStart = (event, nodeData) => {
    event.dataTransfer.setData("application/reactflow", nodeData);
    event.dataTransfer.effectAllowed = "move";
  };

  const [roadmapData, setRoadmapData] = useContext(RoadmapContext);
  // console.log(roadmapData, "from sidebar");
  const [detail, setDetail] = useState("Drag me");
  const handleOnChange = (e) => {
    setDetail(e.target.value);

    setRoadmapData({
      data: e.target.value,
      background: roadmapData.background,
      edgeType: roadmapData.edgeType,
      title: roadmapData.title,
    });
  };
  const handleDocChange = (e) => {
    setDocName(e.target.value);
  };

  const handleOnDocSubmit = (e) => {
    e.preventDefault();
    setRoadmapData({
      data: roadmapData.data,
      background: color.background,
      edgeType: roadmapData.edgeType,
      title: docName,
    });
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
  const [docName, setDocName] = useState("untitled");
  const handleColorChange = (col) => {
    setColor({ background: col.hex });
    const newData = {
      data: roadmapData.data,
      background: color.background,
      edgeType: roadmapData.edgeType,
      title: roadmapData.title,
    };
    setRoadmapData(newData);
    console.log(roadmapData.background);
    console.log(color.background);
  };
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
    const newData = {
      data: roadmapData.data,
      background: color.background,
      edgeType: roadmapData.edgeType,
      title: roadmapData.title,
    };
    setRoadmapData(newData);
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
        <div className='font-medium'>
          {" "}
          Roadmap /{" "}
          <span>
            <form onSubmit={handleOnDocSubmit} className='inline-block'>
              <input
                type='text'
                placeholder='untitled'
                className='border-b-2 focus:outline-none'
                onChange={handleDocChange}
              />
            </form>
          </span>
        </div>
        <div className='description font-bold text-xl mb-2 pt-2'>
          You can drag the nodes to the pane on the right.
        </div>
        <div className='bg-gray-100 cursor-move py-4 flex justify-center rounded-md'>
          <div
            className=' p-4 my-4 w-36 text-md  flex aling-center justify-center font-medium rounded-md shadow-md'
            style={{ background: color.background }}
            onDragStart={(event) => {
              onDragStart(event, "target");
              setDetail("new data");
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

      <footer>
        <div className='mx-2 my-2'>
          <h1 className='font-bold'>Guide </h1>
          <div className='text-sm text-gray-600 '>
            <div className=' flex'>
              Click
              <span className='inline-block'>
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
                    d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
                  />
                </svg>
              </span>
              to select a node
            </div>
            <div>
              <div>
                {" "}
                <span>
                  Backspace{" "}
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 inline-block'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 19l-7-7m0 0l7-7m-7 7h18'
                      />
                    </svg>
                  </span>
                </span>{" "}
                to delete selected node / edge
              </div>
              <div>
                <span>
                  Shift{" "}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 inline-block'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7l4-4m0 0l4 4m-4-4v18'
                    />
                  </svg>{" "}
                </span>
                + Mouse drag select to select mutiple nodes
              </div>
            </div>
          </div>
        </div>
        <div className='flex my-4'>
          <button
            className='px-4 py-2 mx-2 rounded-md text-white font-medium bg-blue-600 flex justify-end'
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className='px-4 py-2 rounded-md text-white font-medium bg-green-600 flex justify-end'
            onClick={onSaveImage}
          >
            Download
          </button>
        </div>
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
