import React, { useState } from "react";

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const [detail, Setdetail] = useState("default");
  const [temp, setTemp] = useState();

  return (
    <div>
      <div className='description font-bold text-xl m-2 '>
        You can drag thesee nodes to the pane on the right. Type something to
        add
      </div>
      <div>
        <div
          className='border-2 border-black p-4 m-10 w-36 text-md  flex aling-center justify-center font-medium rounded-md'
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          {detail}
        </div>
      </div>
      <div className='input'>
        <label htmlFor='input' className='font-medium p-4'>
          Add description
        </label>
        <input
          type='text'
          name='node'
          placeholder='Type something'
          onChange={() => {
            console.log("hey");
          }}
        />
      </div>
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
