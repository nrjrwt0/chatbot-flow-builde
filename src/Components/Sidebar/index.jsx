import React from 'react';
import './index.css';
import MessageNode from '../MessageNode/MessageNode';
import EditContainer from '../EditContainer';

const Sidebar = () => {
  return (
    <aside>
      <MessageNode />
      <EditContainer />
    </aside>
  );
};

export default Sidebar;
