import React, { useState } from "react";
import { toPng } from "html-to-image";
export default function Sidebar({ canvasRef }) {
  const onDragStart = (event, nodeData) => {
    event.dataTransfer.setData("application/reactflow", nodeData);
    event.dataTransfer.effectAllowed = "move";
  };
  const [detail, setDetail] = useState("Drag Me");
  const [temp, setTemp] = useState("");
  const handleOnChange = (e) => {
    setTemp(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setDetail(temp);
    setTemp("");
  };
  const onSaveImage = () => {
    if (canvasRef.current === null) {
      console.log("null");
      return;
    }
    console.log("listening");
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
  return (
    <div className='mx-4 min-h-full'>
      <div className='description font-bold text-xl mb-2 pt-2'>
        You can drag the nodes to the pane on the right.
      </div>
      <div className='bg-gray-100 cursor-pointer py-10 flex justify-center border-2 border-gray-200 '>
        <div
          className='border-2 border-black p-4 my-10 w-36 text-md  flex aling-center justify-center font-medium rounded-md'
          onDragStart={(event) => {
            onDragStart(event, detail);
            setDetail("Drag me");
          }}
          draggable
        >
          {detail}
        </div>
      </div>
      <form action='submit' onSubmit={handleOnSubmit}>
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
            value={temp}
            onChange={handleOnChange}
          />
        </div>
        <div className='flex justify-end my-2'>
          <button
            type='submit'
            className='border-2 border-black px-4 py-1 rounded-md text-white font-medium bg-black flex justify-end'
          >
            Add
          </button>
        </div>
      </form>
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
