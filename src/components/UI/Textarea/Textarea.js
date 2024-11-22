import React from 'react';
import './Textarea.scss';

function Textarea({ value, onChange, placeholder, className }) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`textarea ${className}`}
        />
    );
}

export default Textarea;
