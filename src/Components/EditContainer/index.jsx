import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

const EditContainer = ({ value, onChange }) => {
  return (
    <div className='editable'>
      <div className='editable-heading'>
        <IoMdArrowRoundBack />
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
