// src/Auth/LogoutButton.js
import React from 'react';
import { checkUser } from "./AuthService";
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await checkUser.logOut();
        navigate('/login'); // Redirect after logout
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
