import React, { useRef, useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './style.css';
import Sidebar from '../Sidebar';
import CustomNode from '../CustomNode';
import Navbar from '../Navbar';
import { initialNodes } from './constant';
import { getId } from './utils';
import Snackbar from '../Snackbar';

const nodeTypes = {
  messageNode: CustomNode,
};

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [editedText, setEditText] = useState(nodes.data);
  const [selectedId, selectedNodeId] = useState();

  const onNodeClick = useCallback((_e, value) => {
    const { data, id } = value;
    setEditText(data.label);
    selectedNodeId(id);
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;
      setEditText(value);
      setNodes((nodes) => {
        console.log(nodes, selectedId);
        return nodes.map((item) =>
          item.id === selectedId
            ? { ...item, data: { ...item.data, label: value } }
            : item
        );
      });
    },
    [selectedId, setNodes]
  );

  const hasOutgoingEdge = useCallback(
    (nodeId) => {
      return edges.some((edge) => edge.source === nodeId);
    },
    [edges]
  );

  const hasIncomingEdges = useCallback(
    (nodeId) => {
      return edges.some((edge) => edge.target === nodeId);
    },
    [edges]
  );

  const checkForDisconnectedNodes = useCallback(() => {
    if (nodes.length === 1) {
      alert('Only one node is present');
    } else {
      const disconnectedNodes = nodes.filter(
        (node) => !hasIncomingEdges(node.id) && !hasOutgoingEdge(node.id)
      );
      if (disconnectedNodes.length > 0) {
        alert('Error: There are disconnected nodes in the flow.');
      } else {
        alert('no disconnected node available');
      }
    }
  }, [hasIncomingEdges, hasOutgoingEdge, nodes]);

  const onConnect = useCallback(
    (params) => {
      if (hasOutgoingEdge(params.source)) {
        alert('A node can only have one outgoing edge.');
        return;
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [hasOutgoingEdge, setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: 'messageNode',
        position,
        data: { label: `New Message` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  return (
    <>
      <Navbar checkForDisconnectedNodes={checkForDisconnectedNodes} />
      <div className='dndflow'>
        <div className='reactflow-wrapper' ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onNodeClick={onNodeClick}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background variant={BackgroundVariant.Dots} />
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar
          value={editedText}
          setEditText={setEditText}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default DnDFlow;
