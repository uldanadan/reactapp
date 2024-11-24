import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';  // Добавьте NavLink
import './NavBar.scss';
import Button from "../UI/Button/Button";

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="navbar">
            <div className="container navbar__container">
                <h2 className="navbar__logo">Tech Project</h2>
                <div className="navbar__links">
                    <NavLink to="/applications" className={({ isActive }) => isActive ? 'navbar__link active' : 'navbar__link'}>
                        Aplications
                    </NavLink>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'navbar__link active' : 'navbar__link'}>
                        Dashboard
                    </NavLink>
                </div>
                <div className="navbar__links">
                    <Link to="/application">
                        <Button className="success">Submit Application</Button>
                    </Link>
                    <Button className="primary" onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
