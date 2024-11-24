import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            navigate('/applications');
        }
    }, [navigate]);


    const handleLogin = () => {
        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (email === 'manager_123@gmail.com' && password === 'manager123') {
            localStorage.setItem('currentUser', JSON.stringify({ email, role: 'manager' }));
            navigate('/dashboard');
            return;
        }

        if (!user) {
            setError("Invalid email or password.");
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        setError('');
        navigate('/applications');
        window.location.reload();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="login centered">
            <div className="form-container">
                <h2 className="title">Login</h2>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password-wrapper">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <Button onClick={handleLogin} className="primary sign">Sign in</Button>
                <div className="login__prompt">
                    <p className="text">Don't have an account?</p>
                    <Link to="/register">
                        <Button className="transparent">Sign up</Button>
                    </Link>
                </div>
                {error && <p className="error-message center">{error}</p>}
            </div>
        </div>
    );
}

export default Login;
