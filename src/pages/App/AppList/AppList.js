import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppList.scss';
import Table from '../../../components/UI/Table/Table';

function AppList() {
    const [applications, setApplications] = useState([]);
    const [filteredStatus, setFilteredStatus] = useState('Pending');
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        } else {
            fetchApplications();
        }
    }, [currentUser, navigate]);

    const fetchApplications = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications')) || [];
        const userApplications = allApplications.filter(app => app.email === currentUser.email);

        if (JSON.stringify(userApplications) !== JSON.stringify(applications)) {
            setApplications(userApplications);
        }
    };

    const filteredApplications = applications.filter(app => app.status === filteredStatus);

    const headers = ['App Number', 'Status', 'Submission Date', 'Description', 'File'];

    const rows = filteredApplications.map((app, index) => [
        index + 1,
        app.status,
        new Date(app.submissionDate).toLocaleString(),
        app.description,
        app.file ? app.file : 'No file'
    ]);

    return (
        <div className="app-list">
            <div className="container">
                <div className="app-list__box">
                    <h2 className="title">My Applications</h2>
                    <div className="app-list__status-filter">
                        <button
                            className={`app-list__status-filter__button ${filteredStatus === 'Pending' ? 'active' : ''}`}
                            onClick={() => setFilteredStatus('Pending')}
                        >
                            Pending
                        </button>
                        <button
                            className={`app-list__status-filter__button ${filteredStatus === 'Approved' || filteredStatus === 'Rejected' ? 'active' : ''}`}
                            onClick={() => setFilteredStatus(filteredStatus === 'Approved' ? 'Rejected' : 'Approved')}
                        >
                            Reviewed
                        </button>
                    </div>
                    <Table headers={headers} rows={rows}/>
                </div>
            </div>
        </div>
    );
}

export default AppList;
