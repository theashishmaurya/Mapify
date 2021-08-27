import React, { useState, useRef, useContext, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background,
  useZoomPanHelper,
  Handle,
  useStore,
} from 'react-flow-renderer';
import { toPng } from 'html-to-image';

import Sidebar from './sidebar';
import { RoadmapContext } from '../../api/roadmap/roadmapContext';
import firebase from '../../../firebase/clientApp';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@auth0/nextjs-auth0';
import './roadmap.module.css';
import EditNode from './editNode';
import Error from '../modals/errorModal';
import Success from '../modals/successModal';
const db = firebase.firestore();
const initialElements = [
  {
    id: '1',
    type: 'horizontalConnector',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
    className: 'shadow-md',
    style: {
      background: '#f09d3e',
      padding: '10px 50px',
      borderRadius: '0.375rem',
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
  // const store = useStore();
  // const { transform } = useZoomPanHelper();

  const [roadmapData, setRoadmapData] = useContext(RoadmapContext);
  const [nodeColor, setNodeColor] = useState('#fff');
  const [rfInstance, setRfInstance] = useState(null);
  const [save, setSave] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [isDownloading, setDownloading] = useState(false);

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
    event.dataTransfer.dropEffect = 'move';
    setNodeColor(roadmapData.background);
  };

  const onDrop = (event) => {
    event.preventDefault();
    // console.log(event.dataTransfer);
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: uuidv4(),
      type: 'horizontalConnector',
      position,
      data: { label: `${roadmapData.data}` },
      className: 'shadow-md',
      style: {
        background: nodeColor,
        borderRadius: '0.375rem',
        padding: '10px 40px',
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
        .collection('roadmap')
        .doc(docid)
        .set({
          title:
            roadmapData.title !== undefined ? roadmapData.title : 'untitled',
          user: user.sub,
          flow: flow,
        })
        .then(() => {
          console.log('Saved Data');
          setShowModal(true);
          setMessage({ ...message, success: true });
          setTimeout(() => {
            setShowModal(false);
            setMessage({ ...message, success: false });
          }, 3000);
        })
        .catch((err) => {
          setShowModal(true);
          setMessage({ ...message, error: true });
          setTimeout(() => {
            setShowModal(false);
            setMessage({ ...message, error: false });
          }, 3000);
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
          type="source"
          position="top"
          id="1"
          style={{ borderRadius: '50%', background: 'black' }}
        />

        <div>{data.label}</div>

        <Handle
          id="2"
          type="source"
          position="bottom"
          style={{ borderRadius: '50%', background: 'black' }}
        />
        <Handle
          type="source"
          position="left"
          id="3"
          style={{ borderRadius: '50%', background: 'black' }}
        />
        <Handle
          type="source"
          position="right"
          id="4"
          style={{ borderRadius: '50%', background: 'black' }}
        />
      </div>
    );
  };
  const nodeTypes = {
    horizontalConnector,
  };
  const connectionLineStyle = {
    background: '#000',
  };
  const [selectedNode, setSelectedNode] = useState();
  const onSelect = (event, el) => {
    console.log('element selected');
    console.log(el);
    setIsSidebarActive(false);
    setSelectedNode(el);
    console.log(elements);
  };
  useEffect(async () => {
    console.log('data modified');
    if (docid) {
      console.log('PIDDD');
      await db
        .collection('roadmap')
        .doc(docid)
        .get()
        .then((doc) => {
          // console.log(doc.data());
          const flow = doc.data().flow;
          const [x = 0, y = 0] = flow.position;
          setElements(flow.elements || []);
          // transform({ x: y, zoom: flow.zoom || 0 });
          reactFlowInstance.setTransform({ x: y, zoom: flow.zoom || 0 });
          // console.log(flow);
          rfInstance.fitView();
          reactFlowInstance.fitView();
        })
        .catch((err) => console.log(err));
    } else {
      console.log('no pid');
    }
  }, [setElements, docid, rfInstance]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({
    success: false,
    error: false,
  });

  const onSaveImage = () => {
    rfInstance.fitView();

    if (canvasRef.current === null) {
      console.log('null');
      return;
    }
    setDownloading(true);

    toPng(canvasRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-Roadmap.png';
        link.href = dataUrl;
        link.click();
        setDownloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* <button
        onClick={() => {
          setShowModal(!showModal);
          setMessage({ ...message, error: !error });
        }}
      >
        Click me
      </button> */}
      {showModal && message.error && (
        <Error
          setShowModal={setShowModal}
          error="Your data not saved"
          showModal={showModal}
        />
      )}

      {showModal && message.success && (
        <Success
          setShowModal={setShowModal}
          success="Your data have been saved!"
        />
      )}

      <ReactFlowProvider>
        <div
          className="reactflow-wrapper min-w-auto col-span-3"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            className="max-h-screen min-h-screen"
            nodeTypes={nodeTypes}
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            ref={canvasRef}
            connectionMode={'loose'}
            onElementClick={onSelect}
          >
            {!isDownloading && <Controls />}
            <Background
              variant="dots"
              gap={12}
              size={0.5}
              color="#000"
              style={{ background: '#fff' }}
            />
          </ReactFlow>
        </div>

        <div>
          {isSidebarActive ? (
            <Sidebar
              canvasRef={canvasRef}
              handleSave={handleSave}
              setDownloading={setDownloading}
              onSaveImage={onSaveImage}
            />
          ) : (
            <EditNode
              setIsSidebarActive={setIsSidebarActive}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              elements={elements}
              setElements={setElements}
            />
          )}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
