import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Handle,
  ControlButton,
} from 'react-flow-renderer';
import { toPng } from 'html-to-image';

import firebase from '../../../firebase/clientApp';

const db = firebase.firestore();
const initialElements = [
  {
    id: '1',
    type: 'default',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
    style: { background: '#f09d3e' },
  },
];

const Embed = ({ docid }) => {
  // const { transform } = useZoomPanHelper();

  const [rfInstance, setRfInstance] = useState(null);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [isDownloading, setDownloading] = useState(false);

  const canvasRef = useRef(null);

  useEffect(async () => {
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
          reactFlowInstance.setTransform({ x: y, zoom: flow.zoom || 0 });
          // console.log(flow);
          rfInstance.fitView();
          reactFlowInstance.fitView();
          console.log(doc.data());
        })
        .catch((err) => console.log(err));
    } else {
      console.log('no pid');
    }
    return () => {
      setReactFlowInstance(null);
    };
  }, [docid, rfInstance]);
  const onLoad = async (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
    reactFlowInstance.fitView();
    setRfInstance(reactFlowInstance);
  };
  const horizontalConnector = ({ data }) => {
    return (
      <div>
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
  const onSaveImage = () => {
    rfInstance.fitView();
    if (canvasRef.current === null) {
      // console.log("null");
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

  return (
    <div className="grid" ref={canvasRef}>
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper bg-gray-100 min-h-screen min-w-full border-black"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodesDraggable={false}
            nodesConnectable={false}
            elements={elements}
            onLoad={onLoad}
            nodeTypes={nodeTypes}
            connectionMode={'loose'}
          >
            {!isDownloading && (
              <Controls>
                <ControlButton onClick={onSaveImage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>{' '}
                </ControlButton>
              </Controls>
            )}
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Embed;
