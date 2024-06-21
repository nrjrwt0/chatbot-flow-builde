import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import './style.css';

const EditContainer = ({ value, onChange, saveMessage }) => {
  return (
    <div className='editable'>
      <div className='editable-heading'>
        <span onClick={saveMessage}>
          <IoMdArrowRoundBack />
        </span>
        <p>Message</p>
      </div>
      <div className='label-text'>
        <p>Text</p>
        <textarea value={value} onChange={onChange} name='label' id='' />
      </div>
      <div className='save-message'>
        <button onClick={saveMessage}>Save Message</button>
      </div>
    </div>
  );
};

export default EditContainer;
