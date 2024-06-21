import React from 'react';
import './index.css';
import { MdMessage } from 'react-icons/md';
import { IoMdArrowRoundBack } from 'react-icons/io';

const MessageNode = ({ value, onChange }) => {
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
};

export default MessageNode;
