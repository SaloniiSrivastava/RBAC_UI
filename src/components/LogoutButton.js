import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LogoutButton.css';
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('user');

    // Redirect the user to the login page
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
