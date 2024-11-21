import React from 'react';
import './Button.scss';

function Button({ onClick, children, className }) {
    return (
        <button onClick={onClick} className={`Button ${className}`}>
            {children}
        </button>
    );
}

export default Button;
