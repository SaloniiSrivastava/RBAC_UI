import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Check if username and password are provided
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            // Fetch all users
            const response = await fetch('http://localhost:3001/users');
            const users = await response.json();

            // Find the user that matches the username
            const user = users.find(user => user.name === username);
            console.log('User Found:', user);
            if (!user) {
                setError('User not found');
                return;
            }

            // Check password
            if (user.password !== password) {
                setError('Incorrect password');
                return;
            }

            // Save the logged-in user’s details in localStorage (or session)
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect based on role
            if (user.role === 'admin') {
                navigate('/admin-dashboard'); // Admin dashboard
            } else if (user.role === 'editor') {
                navigate('/editor-dashboard'); // Editor dashboard
            } else if (user.role === 'viewer') {
                navigate('/viewer-dashboard'); // Viewer dashboard
            } else {
                setError('Role not defined');
            }
        } catch (err) {
            setError('Error during login');
            console.error(err);
        }
    };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
