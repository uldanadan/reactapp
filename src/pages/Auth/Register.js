import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.scss';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            navigate('/applications');
        }
    }, [navigate]);

    const handleRegister = () => {
        setFullNameError('');
        setEmailError('');
        setPasswordError('');

        let isValid = true;

        if (!fullName) {
            setFullNameError('*Full Name is required.');
            isValid = false;
        }

        if (!email) {
            setEmailError('*Email is required.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('*Invalid email.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('*Password is required.');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('*Password must be at least 8 characters.');
            isValid = false;
        }

        if (!isValid) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            setEmailError('User with this email already exists');
            return;
        }

        const newUser = { fullName, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        navigate('/');
    };

    return (
        <div className="register centered">
            <div className="form-container">
                <h2 className="title">Register</h2>
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="register__input"
                />
                {fullNameError && <p className="error-message">{fullNameError}</p>} {}

                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                {emailError && <p className="error-message">{emailError}</p>} {}

                <div className="password-wrapper">
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(prevState => !prevState)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>} {}

                <Button onClick={handleRegister} className="primary sign">
                    Register
                </Button>
            </div>
        </div>
    );
}

export default Register;
