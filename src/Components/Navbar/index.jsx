import React from 'react';

const Navbar = ({ checkForDisconnectedNodes = () => {} }) => {
  return (
    <nav className='navbar'>
      <button onClick={checkForDisconnectedNodes}>Save Changes</button>
    </nav>
  );
};

export default Navbar;
