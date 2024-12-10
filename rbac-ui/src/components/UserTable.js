import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from '../api';
import ModalForm from './ModalForm';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers().then((res) => setUsers(res.data));
  }, []);

  const handleSave = (user) => {
    if (user.id) {
      updateUser(user.id, user).then(() => {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
      });
    } else {
      addUser(user).then((res) => {
        setUsers((prev) => [...prev, res.data]);
      });
    }
  };

  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    });
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Add User</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button onClick={() => {
                  setSelectedUser(user);
                  setModalOpen(true);
                }}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        formData={selectedUser || { name: '', email: '', role: '', status: '' }}
        fields={['name', 'email', 'role', 'status']}
      />
    </>
  );
};

export default UserTable;
