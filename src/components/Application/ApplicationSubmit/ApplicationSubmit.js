import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Textarea from '../../UI/Textarea/Textarea';
import { FaFileUpload } from 'react-icons/fa';
import './ApplicationSubmit.scss';

function ApplicationSubmit() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmitApplication = () => {
        if (!fullName || !email || !description) {
            setError('All fields are required');
            return;
        }

        const applicationData = {
            fullName,
            email,
            description,
            file: file ? file.name : null,
            status: 'Pending',
        };

        const allApplications = JSON.parse(localStorage.getItem('applications')) || [];

        const newApplication = { ...applicationData, userId: currentUser.email };
        allApplications.push(newApplication);
        localStorage.setItem('applications', JSON.stringify(allApplications));

        setFullName('');
        setEmail('');
        setDescription('');
        setFile(null);
        navigate('/applications');
    };

    return (
        <div className="application">
            <div className="application__form">
                <h2 className="application__title">Submit Application</h2>
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="application__input"
                />
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <div className="application__file-upload">
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        style={{display: 'none'}}
                    />
                    <label htmlFor="file" className="application__file-label">
                        <FaFileUpload/> Upload File
                    </label>
                </div>
                <Button onClick={handleSubmitApplication} className="primary">
                    Submit Application
                </Button>
                {error && <p className="application__error-message">{error}</p>}
            </div>
        </div>
    );
}

export default ApplicationSubmit;
