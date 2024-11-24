import React, { useState, useEffect } from 'react';
import './Modal.scss';
import Button from "../UI/Button/Button";
import Textarea from "../UI/Textarea/Textarea";

function Modal({ application, onClose, onSave }) {
    const [status, setStatus] = useState(application.status);
    const [comment, setComment] = useState(application.comment || '');

    const handleSave = () => {
        const updatedApplication = {
            ...application,
            status,
            comment,
        };
        onSave(updatedApplication);
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.classList.contains('modal')) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="modal">
            <div className="modal__content">
                <h2 className="title">Review Application</h2>
                <p className="text"><strong>User:</strong> {application.user}</p>
                <p className="text"><strong>Status:</strong>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="modal__select"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </p>
                <p className="text"><strong>Description:</strong> {application.description}</p>
                <p className="text"><strong>File:</strong> {application.file || 'No file'}</p>
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add your comment here..." />
                <div className="modal__actions">
                    <Button onClick={onClose} className="danger">Close</Button>
                    <Button onClick={handleSave} className="success">Save</Button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
