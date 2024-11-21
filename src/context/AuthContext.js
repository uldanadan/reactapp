import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        const storedUser = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = storedUser.find(
            (user) => user.email === email && user.password === password
        );
        if (currentUser) {
            setUser(currentUser);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    };

    const register = (email, password) => {
        const newUser = { email, password };
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
    };

    return (
        <AuthContext.Provider value={{ user, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};
