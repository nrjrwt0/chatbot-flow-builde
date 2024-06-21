import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import './style.css';

const EditContainer = ({ value, onChange, onBackClick }) => {
  return (
    <div className='editable'>
      <div className='editable-heading'>
        <span onClick={onBackClick}>
          <IoMdArrowRoundBack />
        </span>
        <p>Message</p>
      </div>
      <div className='label-text'>
        <p>Text</p>
        <textarea value={value} onChange={onChange} name='label' id='' />
      </div>
    </div>
  );
};

export default EditContainer;
