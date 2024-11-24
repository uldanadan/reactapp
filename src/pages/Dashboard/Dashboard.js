import React, { useState, useEffect } from 'react';
import Table from '../../components/UI/Table/Table';
import Modal from '../../components/Modals/Modal';
import './Dashboard.scss';

function Dashboard() {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications')) || [];
        setApplications(allApplications);
    };

    const handleOpenApplication = (index) => {
        setSelectedApplication(applications[index]);
    };

    const handleSaveApplication = (updatedApplication) => {
        const updatedApplications = applications.map((app) =>
            app.appNumber === updatedApplication.appNumber ? updatedApplication : app
        );
        setApplications(updatedApplications);
        localStorage.setItem('applications', JSON.stringify(updatedApplications));
    };

    const headers = ['App Number', 'User', 'Status', 'Actions'];

    const rows = applications.map((app, index) => [
        index + 1,
        app.user,
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
