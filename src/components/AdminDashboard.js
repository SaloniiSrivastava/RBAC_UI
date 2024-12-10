import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import "./styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', role: 'viewer', password: '' });
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        if (!loggedInUser || loggedInUser.role !== "admin") {
            navigate(loggedInUser ? "/403" : "/");
        }

        const fetchData = async () => {
            try {
                const userResponse = await fetch('http://localhost:3001/users');
                const roleResponse = await fetch('http://localhost:3001/roles');
                const usersData = await userResponse.json();
                const rolesData = await roleResponse.json();
                setUsers(usersData);
                setRoles(rolesData);
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            }
        };

        fetchData();
    }, [navigate]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem('user'));

            // Only allow admins to change roles
            if (loggedInUser.role !== 'admin') {
                alert('You do not have permission to change roles.');
                return;
            }

            // Find the user object to retain existing fields
            const userToUpdate = users.find(user => user.id === userId);
            if (!userToUpdate) throw new Error('User not found');

            // Update the role while keeping other fields intact
            const updatedUser = { ...userToUpdate, role: newRole };

            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                // Update the state with the updated user
                setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
            } else {
                throw new Error('Failed to update role');
            }
        } catch (err) {
            setError('Error updating role');
            console.error(err);
        }
    };

    const handleStatusChange = async (userId, newStatus) => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));

        // Only allow admins or the user themselves to update the status
        const user = users.find((u) => u.id === userId);
        if (!user) return;

        if (loggedInUser.role !== 'admin' && loggedInUser.id !== userId) {
            alert('You do not have permission to change this user\'s status.');
            return;
        }

        try {
            const updatedUser = { ...user, status: newStatus };
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            // Update the local state
            setUsers((prevUsers) =>
                prevUsers.map((u) => (u.id === userId ? updatedUser : u))
            );
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update status');
        }
    };



    // Handle delete user
    const handleDelete = async (userId) => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));

        // Only allow admins to delete users
        if (loggedInUser.role !== 'admin') {
            alert('You do not have permission to delete users.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers(users.filter(user => user.id !== userId));
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (err) {
            setError('Error deleting user');
            console.error(err);
        }
    };

    // Handle adding a new user
    const handleAddUser = async (e) => {
        e.preventDefault();

        const loggedInUser = JSON.parse(localStorage.getItem('user'));

        // Only allow admins to add users
        if (loggedInUser.role !== 'admin') {
            alert('You do not have permission to add users.');
            return;
        }

        const response = await fetch('http://localhost:3001/users');
        const userList = await response.json();

        const newUserWithId = {
            ...newUser,
            id: userList.length ? Math.max(...userList.map((user) => user.id)) + 1 : 1,
            status: 'active', // Default status
        };

        const addResponse = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserWithId),
        });

        if (addResponse.ok) {
            setUsers([...users, newUserWithId]);
            setShowModal(false);
            setNewUser({ name: '', role: 'viewer', password: '' });
        } else {
            alert("Failed to add user.");
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <button onClick={() => setShowModal(true)} disabled={loggedInUser.role !== 'admin'}>
                Add User
            </button>
            <LogoutButton />
            {error && <p className="error">{error}</p>}
            {/* Add User Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add User</h2>
                        <form onSubmit={handleAddUser}>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Role:</label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="viewer">Viewer</option>
                                    <option value="editor">Editor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit">Add User</button>
                            <button type="button" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="user-cards-container">
                {users.map((user) => (
                    <div key={user.id} className="user-card">
                        <h3>{user.name}</h3>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Status:</strong> {user.status}</p>
                        <div className="card-actions">
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                disabled={loggedInUser.id === user.id || loggedInUser.role !== 'admin'}
                            >
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="viewer">Viewer</option>
                            </select>
                            <select
                                value={user.status}
                                onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                disabled={loggedInUser.id === user.id || (loggedInUser.role !== 'admin' && loggedInUser.role !== 'editor')}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button
                                onClick={() => handleDelete(user.id)}
                                disabled={loggedInUser.id === user.id || loggedInUser.role !== 'admin'}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
