import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/UI/Table/Table';
import Modal from '../../components/Modals/Modal';
import './Dashboard.scss';

const headers = ['App Number', 'User', 'Status', 'Actions'];

function Dashboard() {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser || currentUser.role !== 'manager') {
            navigate('/');
            return;
        }

        fetchApplications();
    }, [navigate]);

    const fetchApplications = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications')) || [];
        setApplications(allApplications);
    };

    const handleOpenApplication = (index) => {
        navigate(`/dashboard/${index}`);
    };

    const handleSaveApplication = (updatedApplication) => {
        const updatedApplications = [...applications];
        updatedApplications[updatedApplication.index] = {
            ...applications[updatedApplication.index],
            ...updatedApplication,
        };

        setApplications(updatedApplications);
        localStorage.setItem('applications', JSON.stringify(updatedApplications));
        setSelectedApplication(null);
    };

    const rows = applications.map((app, index) => [
        index + 1,
        app.email,
        app.status,
    ]);

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard__box">
                    <h2 className="title">All Applications</h2>
                    <Table headers={headers} rows={rows} onOpenApplication={handleOpenApplication} />
                </div>
            </div>

            {selectedApplication && (
                <Modal
                    application={selectedApplication}
                    onClose={() => setSelectedApplication(null)}
                    onSave={handleSaveApplication}
                />
            )}
        </div>
    );
}

export default Dashboard;
