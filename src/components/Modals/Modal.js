import React, { useState, useEffect, useRef } from 'react';
import './Modal.scss';
import Button from "../UI/Button/Button";
import Textarea from "../UI/Textarea/Textarea";

function Modal({ onClose, onSave, actionType }) {
    const [comment, setComment] = useState('');
    const modalRef = useRef(null);

    const handleSave = () => {
        onSave(comment);
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
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
            <div className="modal__content" ref={modalRef}>
                <h2 className="title">
                    {actionType === 'Approved' ? 'Approve Application' : 'Reject Application'}
                </h2>
                <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add your comment..."
                />
                <div className="modal__actions">
                    <Button onClick={onClose} className="danger">Cancel</Button>
                    <Button onClick={handleSave} className="success">Save</Button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
