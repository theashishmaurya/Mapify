import React, { useState, useRef, useCallback, useContext } from "react";
import { toPng } from "html-to-image";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background,
} from "react-flow-renderer";

import Sidebar from "./sidebar";
import { RoadmapContext } from "../../api/roadmap/roadmapContext";

const initialElements = [
  {
    id: "1",
    type: "default",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
    style: { background: "#f09d3e" },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const [roadmapData, setRoadmapData] = useContext(RoadmapContext);
  console.log(roadmapData);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
    reactFlowInstance.fitView();
    console.log(reactFlowInstance);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    console.log(event.dataTransfer);
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = event.dataTransfer.getData("application/reactflow");
    console.log(data);
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type: "default",
      position,
      data: { label: `${data}` },
    };
    // child node style = style: { padding: 5, width: 100 },

    setElements((es) => es.concat(newNode));
  };
  ////////////////////////HTML to canvas//////////////////////
  const canvasRef = useRef(null);

  return (
    <div className='grid grid-cols-4'>
      <ReactFlowProvider>
        <div
          className='reactflow-wrapper bg-gray-200 min-h-screen min-w-min col-span-3 border-2 border-black'
          ref={reactFlowWrapper}
        >
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            ref={canvasRef}
          >
            <Controls />
            <Background variant='dots' gap={12} size={0.5} color='#000' />
          </ReactFlow>
        </div>

        <div>
          <Sidebar canvasRef={canvasRef} />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
