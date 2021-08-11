import React, { useState, useRef, useContext } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background,
  useZoomPanHelper,
  Handle,
} from "react-flow-renderer";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Sidebar from "./sidebar";
import { RoadmapContext } from "../../api/roadmap/roadmapContext";
import firebase from "../../../firebase/clientApp";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@auth0/nextjs-auth0";

const db = firebase.firestore();
const initialElements = [
  {
    id: "1",
    type: "default",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
    style: { background: "#f09d3e" },
  },
];

const DnDFlow = ({ docid }) => {
  // const [value, loading, error] = useDocument(
  //   db.doc("be33284a-dd18-4a1a-8a9e-5a4c33309da0"),
  //   {
  //     // snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  // if (error) {
  //   console.log("error");
  //   return null;
  // }
  // console.log(value);
  const { user, error, isLoading } = useUser();
  // const { transform } = useZoomPanHelper();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;
  const { transform } = useZoomPanHelper();

  const [roadmapData, setRoadmapData] = useContext(RoadmapContext);
  const [nodeColor, setNodeColor] = useState("#fff");
  const [rfInstance, setRfInstance] = useState(null);
  const [save, setSave] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) => {
    const newparams = { ...params, type: roadmapData.edgeType };
    setElements((els) => addEdge(newparams, els));
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
    reactFlowInstance.fitView();
    setRfInstance(reactFlowInstance);
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
      id: uuidv4(),
      type: "horizontalConnector",
      position,
      data: { label: `${roadmapData.data}` },
      style: { background: nodeColor, borderRadius: "0.375rem" },
    };
    // child node style = style: { padding: 5, width: 100 },

    setElements((es) => es.concat(newNode));
  };
  ////////////////////////HTML to canvas////////////////////////
  const canvasRef = useRef(null);
  ///////////////////////////Save and Restore ///////////////////

  const handleSave = async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      setSave(flow);
      console.log(rfInstance.toObject());
      await db
        .collection("roadmap")
        .doc(docid)
        .set({
          title: roadmapData.title,
          user: user.sub,
          flow,
        })
        .then(() => {
          console.log("Saved Data");
        });
    }
  };

  const horizontalConnector = ({ data }) => {
    console.log(data);
    return (
      <div
        style={{ padding: "10px 40px", fontSize: 10 }}
        className='border border-black px-10 rounded-md  '
      >
        <Handle
          type='target'
          position='top'
          id='1'
          style={{ borderRadius: "50%", background: "red" }}
        />

        <div>{data.label}</div>

        <Handle
          id='2'
          type='source'
          position='bottom'
          style={{ borderRadius: "50%", background: "green" }}
        />
        <Handle
          type='target'
          position='left'
          id='3'
          style={{ borderRadius: "50%", background: "red" }}
        />
        <Handle
          type='source'
          position='right'
          id='4'
          style={{ borderRadius: "50%", background: "green" }}
        />
      </div>
    );
  };
  const nodeTypes = {
    horizontalConnector,
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log(roadmapData);
  return (
    <div className='grid grid-cols-4'>
      <ReactFlowProvider>
        <div
          className='reactflow-wrapper  min-h-screen min-w-min col-span-3 border-2 border-black'
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodeTypes={nodeTypes}
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
          <Sidebar canvasRef={canvasRef} handleSave={handleSave} />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
