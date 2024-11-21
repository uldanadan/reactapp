import React from 'react';
import './Input.scss';

function Input({ type, placeholder, value, onChange, className }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`input-field ${className}`} // Используем правильные кавычки для шаблонной строки
        />
    );
}

export default Input;
