import React from 'react';
import '../styles/Home.css';

const Button = ({ children, onClick, className = "", variant = "dark", ...props }) => {
  return (
    // variant can be "dark" or "red"
    <div className={`button1 ${variant} ${className}`} onClick={onClick} {...props}>
      <div className="button_lg">
        <div className="button_sl"></div>
        <span className="button_text">{children}</span>
      </div>
    </div>
  );
};

export default Button;