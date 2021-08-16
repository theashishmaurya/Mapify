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
import "./roadmap.module.css";
import EditNode from "./editNode";
const db = firebase.firestore();
const initialElements = [
  {
    id: "1",
    type: "horizontalConnector",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
    className: "shadow-md",
    style: {
      background: "#f09d3e",
      padding: "10px 50px",
      borderRadius: "0.375rem",
    },
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
  const [isSidebarActive, setIsSidebarActive] = useState(true);

  const onConnect = (params) => {
    console.log(params);
    const newparams = {
      ...params,
      type: roadmapData.edgeType,
      style: { strokeWidth: 2 },
    };
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
      className: "shadow-md",
      style: {
        background: nodeColor,
        borderRadius: "0.375rem",
        padding: "10px 40px",
      },
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
          alert("Your data is saved");
        });
    }
  };

  const horizontalConnector = ({ data }) => {
    return (
      <div
      // style={{ padding: "10px 40px", fontSize: 15 }}
      // className='border border-black px-10 rounded-md'
      >
        <Handle
          type='source'
          position='top'
          id='1'
          style={{ borderRadius: "50%", background: "black" }}
        />

        <div>{data.label}</div>

        <Handle
          id='2'
          type='source'
          position='bottom'
          style={{ borderRadius: "50%", background: "black" }}
        />
        <Handle
          type='source'
          position='left'
          id='3'
          style={{ borderRadius: "50%", background: "black" }}
        />
        <Handle
          type='source'
          position='right'
          id='4'
          style={{ borderRadius: "50%", background: "black" }}
        />
      </div>
    );
  };
  const nodeTypes = {
    horizontalConnector,
  };
  const connectionLineStyle = {
    background: "#000",
  };
  const onSelect = (event, el) => {
    console.log("element selected");
    console.log(el);
    setIsSidebarActive(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className='grid grid-cols-4'>
      <ReactFlowProvider>
        <div
          className='reactflow-wrapper min-h-screen min-w-min col-span-3 border-2 border-black'
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
            connectionMode={"loose"}
            onElementClick={onSelect}
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
          {isSidebarActive ? (
            <Sidebar canvasRef={canvasRef} handleSave={handleSave} />
          ) : (
            <EditNode setIsSidebarActive={setIsSidebarActive} />
          )}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
