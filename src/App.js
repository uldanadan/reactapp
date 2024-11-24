import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ApplicationSubmit from './components/Application/ApplicationSubmit/ApplicationSubmit';
import ApplicationList from './components/Application/ApplicationList/ApplicationList';
// import Dashboard from './components/Dashboard/Dashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            {isAuthenticated && <NavBar />}

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/application" element={<ApplicationSubmit />} />
                <Route path="/applications" element={<ApplicationList />} />
                {/*<Route path="/dashboard" element={<Dashboard />} />*/}
            </Routes>
        </Router>
    );
}

export default App;
