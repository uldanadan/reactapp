import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AppSubmit from './pages/App/AppSubmit/AppSubmit';
import AppList from './pages/App/AppList/AppList';
import Dashboard from './pages/Dashboard/Dashboard';
import DetailDashboard from './pages/Dashboard/DetailDashboard/DetailDashboard';

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
                <Route path="/application" element={<AppSubmit />} />
                <Route path="/applications" element={<AppList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:id" element={<DetailDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
