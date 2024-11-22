import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import { FaFileUpload } from 'react-icons/fa';
import { submitApplication, getApplications } from '../../api/api';
import './Application.scss';

function Application() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();
    const userId = 1;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmitApplication = async () => {
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
            userId: userId
        };

        try {
            const response = await submitApplication(applicationData);
            console.log(response);
            setError('');
            setFullName('');
            setEmail('');
            setDescription('');
            setFile(null);
            navigate('/applications');
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        }
    };

    const fetchApplications = async () => {
        try {
            const userApplications = await getApplications(userId);
            setApplications(userApplications);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

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
                    className="application__textarea"
                />
                <div className="application__file-upload">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="application__file-input"
                    />
                    <label htmlFor="file" className="application__file-label">
                        <FaFileUpload /> Upload File
                    </label>
                </div>
                <Button onClick={handleSubmitApplication} className="primary">
                    Submit Application
                </Button>
                {error && <p className="application__error-message">{error}</p>}
            </div>
            <div className="application__list">
                <h2>Your Previous Applications</h2>
                <ul>
                    {applications && applications.length > 0 ? (
                        applications.map((app, index) => (
                            <li key={index}>
                                <p><strong>{app.fullName}</strong> - {app.status}</p>
                                <p>{app.description}</p>
                            </li>
                        ))
                    ) : (
                        <p>No applications found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Application;
