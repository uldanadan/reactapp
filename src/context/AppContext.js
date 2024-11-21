import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [applications, setApplications] = useState(
        JSON.parse(localStorage.getItem('applications')) || []
    );

    const submitApplication = (application) => {
        const newApplications = [...applications, application];
        setApplications(newApplications);
        localStorage.setItem('applications', JSON.stringify(newApplications));
    };

    const updateApplicationStatus = (id, status) => {
        const updatedApplications = applications.map((app) =>
            app.id === id ? { ...app, status } : app
        );
        setApplications(updatedApplications);
        localStorage.setItem('applications', JSON.stringify(updatedApplications));
    };

    return (
        <AppContext.Provider value={{ applications, submitApplication, updateApplicationStatus }}>
            {children}
        </AppContext.Provider>
    );
};
