import React, { memo } from 'react';
import './style.css';
import { MdMessage } from 'react-icons/md';

const MessageNode = memo(() => {
  const onDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className='new-message-node'
      onDragStart={(event) => onDragStart(event)}
      draggable
    >
      <span>
        <MdMessage />
      </span>
      <p>New Message</p>
    </div>
  );
});

export default MessageNode;
