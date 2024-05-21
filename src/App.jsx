import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow,
{
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  useOnSelectionChange,
} from 'reactflow';

import 'reactflow/dist/style.css';
import TextUpdaterNode from './components/TextNode';
import { FaEnvelope } from "react-icons/fa"
import { nanoid } from 'nanoid';
import { useDataContext } from './contexts/DataContext';
import SideBar from './components/SideBar';

const initialNodes = [
  {
    id: '1',
    type: 'textUpdater',
    position: { x: 50, y: 30 },
    data: { text: 'text message' },
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const reactFlowWrapper = useRef(null);

  const { nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    isNodeSelected,
    setIsNodeSelected,
    onEdgesChange
  } = useDataContext();

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [error, setError] = useState(false);




  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);







  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { text: `text message ${nodes.length += 1}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);


  const onConnect = useCallback(
    (params) => {
      console.log(edges.filter(item => item.source === params.source));
      if (edges.find(item => item.source === params.source)) {
        alert("Can only have one edge originating from a source handle");
      } else {
        setEdges((eds) => addEdge(params, eds))
      }
    },
    [edges, setEdges],
  );

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError(false)
      }
    }, 2000);
  }, [error])

  function hasOrphanNode({ nodes, edges }) {
    let nodeWithTargetHandles = [];

    let nodesId = nodes.map(item => item.id);
    console.log(nodesId);

    if (edges.length === 0) {
      return true;
    }

    else {
      nodesId.forEach(item => {
        edges.forEach((eds) => {
          if (item === eds.target) {
            console.log("lalal")
            nodeWithTargetHandles.push(item);
          }
        })
      })
      let diff = nodes.length - nodeWithTargetHandles.length;
      console.log("diff", diff);
      if ((nodes.length - nodeWithTargetHandles.length) > 1) {
        return true;
      } else {
        return false;
      }
    }



  }


  console.log({ edges, nodes })

  return (

    <div style={{ width: '100vw', height: '100vh' }}>
      <div
        style={{
          background: error ? "#ffbaba" : "white",
          display: "flex",
          padding: "20px",
          borderBottom: "1px solid #CCCC",
        }}
      >
        {
          error && <p>Cannot Save Flow</p>
        }
        <button
          style={{
            marginLeft: "auto",
            padding: "8px 16px",
            border: '2px solid #0559cfcc',
            borderRadius: "5px",
            background: "white",
            color: "#0559cfcc"
          }}
          onClick={() => {

            console.log({ nodes, edges });

            if (hasOrphanNode({ edges, nodes })) {
              setError(true)
            } else {
              alert("Your workflow has been saved")
            }

          }}
        >Save Changes</button>
      </div>
      <ReactFlowProvider>
        <div style={{ width: '100vw', height: '100vh' }} ref={reactFlowWrapper}>
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background variant="dots" gap={12} size={1} />
            <SideBar />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}