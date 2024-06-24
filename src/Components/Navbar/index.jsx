import React, { memo } from 'react';
import './style.css';

const Navbar = memo(({ checkForDisconnectedNodes, clearAllNodesAndEdges }) => {
  return (
    <nav className='navbar'>
      <button onClick={checkForDisconnectedNodes}>Save Changes</button>
      <button onClick={clearAllNodesAndEdges}>Clear</button>
    </nav>
  );
});

export default Navbar;
