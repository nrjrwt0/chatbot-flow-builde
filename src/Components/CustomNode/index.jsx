import { useNodeId } from 'reactflow';
import { Handle, Position } from 'reactflow';
import './style.css';
import { MdMessage } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';

const CustomNode = ({ data }) => {
  const nodeId = useNodeId();

  console.log({ nodeId });

  return (
    <>
      <Handle type='target' id={nodeId + 'a'} position={Position.Left} />
      <div className='node-container'>
        <div className='node-header'>
          <MdMessage />
          <p>Send Message</p>
          <IoLogoWhatsapp />
        </div>
        <div className='label'>{data.label}</div>
      </div>
      <Handle type='source' id={nodeId + 'b'} position={Position.Right} />
    </>
  );
};

export default CustomNode;
