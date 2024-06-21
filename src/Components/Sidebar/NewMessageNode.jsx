import React, { useCallback } from 'react';
import './index.css';

const NewMessageNode = () => {
  const onDragStart = useCallback((event) => {
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <aside>
      <div className='dndnode' onDragStart={onDragStart} draggable>
        New Message Node
      </div>
    </aside>
  );
};

export default NewMessageNode;
