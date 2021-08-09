import React, { useState, useRef, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  useZoomPanHelper,
} from "react-flow-renderer";

import firebase from "../../../firebase/clientApp";

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

const View = ({ docid }) => {
  const { transform } = useZoomPanHelper();

  const [rfInstance, setRfInstance] = useState(null);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  useEffect(async () => {
    if (docid) {
      console.log("PIDDD");
      await db
        .collection("roadmap")
        .doc(docid)
        .get()
        .then((doc) => {
          console.log(doc.data());
          const flow = doc.data().flow;
          const [x = 0, y = 0] = flow.position;
          setElements(flow.elements || []);
          transform({ x: y, zoom: flow.zoom || 0 });
          console.log(rfInstance.toObject());
          onLoad(rfInstance);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("no pid");
    }
  }, [docid]);
  const onLoad = async (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
    reactFlowInstance.fitView();
    setRfInstance(reactFlowInstance);
  };

  return (
    <div className='grid'>
      <ReactFlowProvider>
        <div
          className='reactflow-wrapper  min-h-screen min-w-min border-2 border-black'
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodesDraggable={false}
            nodesConnectable={false}
            elements={elements}
            onLoad={onLoad}
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default View;
