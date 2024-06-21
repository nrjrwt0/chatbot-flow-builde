import React from 'react';
import './style.css';

const Snackbar = ({ type, message }) => {
  return (
    type && (
      <div className={`snackbar-container ${type.toLowerCase()}`}>
        {type}: {message}
      </div>
    )
  );
};

export default Snackbar;
