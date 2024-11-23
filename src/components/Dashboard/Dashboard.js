import React, { useState, useEffect } from 'react';
import Button from '../UI/Button/Button';
import Textarea from '../UI/Textarea/Textarea';
import './Dashboard.scss';

function Dashboard() {
    const [applications, setApplications] = useState([]);
    const [comments, setComments] = useState({});

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications')) || [];
        setApplications(allApplications);
    };

    const updateStatus = (index, status) => {
        const allApplications = [...applications];
        allApplications[index].status = status;
        localStorage.setItem('applications', JSON.stringify(allApplications));
        setApplications(allApplications);
    };

    const handleCommentChange = (index, value) => {
        setComments({ ...comments, [index]: value });
    };

    const addComment = (index) => {
        const allApplications = [...applications];
        if (!allApplications[index].comments) {
            allApplications[index].comments = [];
        }
        allApplications[index].comments.push(comments[index]);
        localStorage.setItem('applications', JSON.stringify(allApplications));
        setApplications(allApplications);
    };

    return (
        <div className="manager-dashboard">
            <h2 className="title">Manager Dashboard</h2>
            <ul className="list">
                {applications.map((app, index) => (
                    <li key={index} className="list-item">
                        <p className="text">{app.fullName} - {app.status}</p>
                        <p className="text">{app.description}</p>
                        {app.file && <p className="text">File: {app.file}</p>}
                        <div className="button-container">
                            <Button
                                className="primary"
                                onClick={() => updateStatus(index, 'Approved')}
                            >
                                Approve
                            </Button>
                            <Button
                                className="danger"
                                onClick={() => updateStatus(index, 'Rejected')}
                            >
                                Reject
                            </Button>
                        </div>
                        <div className="comments-section">
                            <Textarea
                                value={comments[index] || ''}
                                onChange={(e) => handleCommentChange(index, e.target.value)}
                                placeholder="Add a comment"
                            />
                            <Button
                                className="success"
                                onClick={() => addComment(index)}
                            >
                                Add Comment
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
