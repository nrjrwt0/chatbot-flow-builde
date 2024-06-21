import React, { useRef, useCallback, useState, useEffect } from 'react';
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
import { AlertType, initAlertContent, initialNodes } from './constant';
import {
  getId,
  removeFlowFromLocalStorage,
  retrieveFlowFromLocalStorage,
  saveFlowToLocalStorage,
} from './utils';
import Snackbar from '../Snackbar';

const nodeTypes = {
  messageNode: CustomNode,
};

const { nodes: savedNodes, edges: savedEdges } = retrieveFlowFromLocalStorage();

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    savedNodes || initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges || []);
  const { screenToFlowPosition } = useReactFlow();
  const [editedText, setEditText] = useState();
  const [selectedId, selectedNodeId] = useState();
  const [alertContent, setAlertContent] = useState(initAlertContent);
  const timerRef = useRef();

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

  const showSnackBar = useCallback((type, message) => {
    setAlertContent({ type, message });
    timerRef.current = setTimeout(() => {
      setAlertContent(initialNodes);
    }, 2000);
  }, []);

  const checkForDisconnectedNodes = useCallback(() => {
    if (nodes.length === 1) {
      setAlertContent();
      showSnackBar(AlertType.success, 'Only one node is present');
    } else {
      const disconnectedNodes = nodes.filter(
        (node) => !hasIncomingEdges(node.id) && !hasOutgoingEdge(node.id)
      );
      if (disconnectedNodes.length > 0) {
        showSnackBar(
          AlertType.error,
          'There are disconnected nodes in the flow.'
        );
      } else {
        saveFlowToLocalStorage(nodes, edges);
        showSnackBar(AlertType.success, 'Saved Data');
      }
    }
  }, [edges, hasIncomingEdges, hasOutgoingEdge, nodes, showSnackBar]);

  const clearAllNodesAndEdges = useCallback(() => {
    setNodes(initialNodes);
    setEdges([]);
    removeFlowFromLocalStorage();
  }, [setEdges, setNodes]);

  const onConnect = useCallback(
    (params) => {
      if (hasOutgoingEdge(params.source)) {
        showSnackBar(
          AlertType.error,
          'A node can only have one outgoing edge.'
        );
        return;
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [hasOutgoingEdge, setEdges, showSnackBar]
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

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Snackbar {...alertContent} />
      <Navbar
        checkForDisconnectedNodes={checkForDisconnectedNodes}
        clearAllNodesAndEdges={clearAllNodesAndEdges}
      />
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
