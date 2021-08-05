import React from "react";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className='description'>
        You can drag these nodes to the pane on the right. Type something to add
      </div>
      <div
        className='dndnode'
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div className='input'>
        <label htmlFor='input'>Add description</label>
        <input type='text' name='node' value=' ' placeholder='Type something' />
      </div>
    </aside>
  );
};
export default Sidebar;

{
  /* <div className='grid grid-cols-4 gap-4'>
      <div className='bg-gray-200 min-h-screen min-w-min col-span-3 border-2 border-black'>
        <ReactFlow elements={initialElements} onLoad={onLoad}>
          <Controls />
        </ReactFlow>
      </div>
      <div>This is new div</div>
    </div> */
}
