import React, { useCallback } from 'react';
import './style.css';
import MessageNode from '../MessageNode/MessageNode';
import EditContainer from '../EditContainer';

const Sidebar = (props) => {
  const { value, setEditText } = props;
  const saveMessage = useCallback(() => {
    setEditText();
  }, [setEditText]);
  return (
    <aside>
      {!value ? (
        <MessageNode />
      ) : (
        <EditContainer {...props} saveMessage={saveMessage} />
      )}
    </aside>
  );
};

export default Sidebar;
