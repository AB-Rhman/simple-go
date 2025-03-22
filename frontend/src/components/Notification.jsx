import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`notification ${type} show`}>
      {message}
    </div>
  );
};

export default Notification; 