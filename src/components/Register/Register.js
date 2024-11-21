import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register.scss';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!fullName || !email || !password) {
            setError('All fields are required');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.some((user) => user.email === email);
        if (userExists) {
            setError('User with this email already exists');
            return;
        }

        users.push({ fullName, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        navigate('/login');
    };

    return (
        <div className="register">
            <div className="register__form">
                <h2 className="register__title">Register</h2>
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="register__input"
                />
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <div className="register__password-wrapper">
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="register__input"
                    />
                    <button
                        type="button"
                        className="register__password-toggle"
                        onClick={() => setShowPassword(prevState => !prevState)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />} {}
                    </button>
                </div>
                <Button onClick={handleRegister} className="primary">
                    Register
                </Button>
                {error && <p className="register__error-message">{error}</p>}
            </div>
        </div>
    );
}

export default Register;
