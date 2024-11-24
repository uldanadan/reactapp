import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modals/Modal';
import Button from '../../../components/UI/Button/Button';
import './DetailDashboard.scss';

function DetailDashboard() {
    const { id } = useParams();
    const [application, setApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const applications = JSON.parse(localStorage.getItem('applications')) || [];
        if (applications[id]) {
            setApplication({ ...applications[id], id: parseInt(id) });
        } else {
            navigate('/dashboard');
        }
    }, [id, navigate]);

    const handleOpenModal = (type) => {
        setActionType(type);
        setIsModalOpen(true);
    };

    const handleSave = (comment) => {
        const applications = JSON.parse(localStorage.getItem('applications')) || [];
        applications[id] = {
            ...application,
            status: actionType,
            comment,
        };
        localStorage.setItem('applications', JSON.stringify(applications));
        setApplication(applications[id]);
        setIsModalOpen(false);
    };

    if (!application) return null;

    return (
        <div className="detail-dashboard">
            <div className="container">
                <h2 className="title">Review Application</h2>
                <p className="text"><strong>Email:</strong> {application.email}</p>
                <p className="text"><strong>Status:</strong> {application.status}</p>
                <p className="text"><strong>Description:</strong> {application.description}</p>
                <p className="text-file"><strong>File:</strong> {application.file || 'No file uploaded'}</p>
                <div className="actions">
                    <Button onClick={() => handleOpenModal('Approved')} className="success">Approve</Button>
                    <Button onClick={() => handleOpenModal('Rejected')} className="danger">Reject</Button>
                </div>
                {isModalOpen && (
                    <Modal
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSave}
                        actionType={actionType}
                    />
                )}
            </div>
        </div>
    );
}

export default DetailDashboard;
