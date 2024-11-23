import React, { useState, useEffect } from 'react';
import './ApplicationList.scss';

function ApplicationList() {
    const [applications, setApplications] = useState([]);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications')) || [];
        const userApplications = allApplications.filter(app => app.userId === currentUser.email);
        setApplications(userApplications);
    };

    return (
        <div className="application-list">
            <h2 className="application-list__title">Your Previous Applications</h2>
            <ul className="application-list__list">
                {applications && applications.length > 0 ? (
                    applications.map((app, index) => (
                        <li key={index} className="application-list__item">
                            <p className="application-list__item-name">{app.fullName} - {app.status}</p>
                            <p className="application-list__item-description">{app.description}</p>
                            {app.file && <p className="application-list__item-file">File: {app.file}</p>}
                        </li>
                    ))
                ) : (
                    <p className="application-list__no-applications">No applications yet.</p>
                )}
            </ul>
        </div>
    );
}

export default ApplicationList;
