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
  const [nodeColor, setNodeColor] = useState("#fff");
  const [saveElements, setSaveElements] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => {
    const newparams = { ...params, type: roadmapData.edgeType };
    console.log(elements);
    setElements((els) => addEdge(newparams, els));
    console.log(elements);
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
    reactFlowInstance.fitView();
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setNodeColor(roadmapData.background);
  };

  const onDrop = (event) => {
    event.preventDefault();
    console.log(event.dataTransfer);
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type: "default",
      position,
      data: { label: `${data}` },
      style: { background: nodeColor },
    };
    // child node style = style: { padding: 5, width: 100 },

    setElements((es) => es.concat(newNode));
  };
  ////////////////////////HTML to canvas////////////////////////
  const canvasRef = useRef(null);
  ///////////////////////////Save and Restore ///////////////////

  const handleSave = () => {
    setSaveElements(elements);
    console.log(saveElements);
  };
  const handleRestore = () => {
    if (saveElements) {
      setElements(saveElements);
      console.log(elements);
    }
  };

  return (
    <div className='grid grid-cols-4'>
      <ReactFlowProvider>
        <div
          className='reactflow-wrapper  min-h-screen min-w-min col-span-3 border-2 border-black'
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
            <Background
              variant='dots'
              gap={12}
              size={0.5}
              color='#000'
              style={{ background: "#fff" }}
            />
          </ReactFlow>
        </div>

        <div>
          <Sidebar canvasRef={canvasRef} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleRestore}>Restore</button>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
