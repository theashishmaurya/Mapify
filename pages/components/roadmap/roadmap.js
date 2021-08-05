import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState, useRef } from "react";
import ReactFlow, {
  Controls,
  ReactFlowProvider,
  addEdge,
  removeElements,
} from "react-flow-renderer";
export default function Roadmap() {
  // const { user, error, isLoading } = useUser();
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  const initialElements = [
    {
      id: "1",
      type: "input", // input node
      data: { label: "Input Node" },
      position: { x: 250, y: 25 },
    },
    // default node
    {
      id: "2",
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
    },
    {
      id: "3",
      type: "output", // output node
      data: { label: "Output Node" },
      position: { x: 250, y: 250 },
    },
    // animated edge
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
  ];
  const onLoad = (reactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
    reactFlowInstance.fitView();
  };
  const [elements, setElements] = useState(initialElements);

  // console.log(window.innerHeight, window.innerWidth);
  return (
    <div className='grid grid-cols-4 gap-4'>
      <div className='bg-gray-200 min-h-screen min-w-min col-span-3 border-2 border-black'>
        <ReactFlow elements={initialElements} onLoad={onLoad}>
          <Controls />
        </ReactFlow>
      </div>
      <div>This is new div</div>
    </div>
  );
}
