import React from 'react';

const Alert = ({ message, type }) => {
  const alertStyles = {
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '0.25rem',
    color: '#fff',
    backgroundColor: type === 'error' ? '#4caf50' : '#f44336',
  };

  return <div style={alertStyles}>{message}</div>;
};

export default Alert;
