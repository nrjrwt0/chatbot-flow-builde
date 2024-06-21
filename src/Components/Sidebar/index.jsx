import React, { useCallback } from 'react';
import './style.css';
import MessageNode from '../MessageNode/MessageNode';
import EditContainer from '../EditContainer';

const Sidebar = (props) => {
  const { value, setEditText } = props;
  const onBackClick = useCallback(() => {
    setEditText();
  }, [setEditText]);
  return (
    <aside>
      {!value ? (
        <MessageNode />
      ) : (
        <EditContainer {...props} onBackClick={onBackClick} />
      )}
    </aside>
  );
};

export default Sidebar;
