import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            setError("Invalid email or password.");
            return;
        }

        setError('');
        navigate('/dashboard');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="login">
            <div className="login__form">
                <h2>Login</h2>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="login__password-wrapper">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="login__password-toggle"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash/> : <FaEye/>} {}
                    </button>
                </div>
                <Button onClick={handleLogin} className="primary">Login</Button>
                {error && <p className="login__error-message ">{error}</p>}
            </div>
        </div>
    );
}

export default Login;
