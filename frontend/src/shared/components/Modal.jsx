import React from 'react';

const Modal = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`relative bg-white dark:bg-neutral-800 rounded-lg shadow-lg ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;