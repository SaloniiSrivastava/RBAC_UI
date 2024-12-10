import React, { useState, useEffect } from "react";
import axios from "axios";
import RoleTable from "./RoleTable";
import ModalForm from "./ModalForm"; // A reusable modal form component

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Fetch roles and permissions on mount
  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => setRoles(res.data));
    axios.get("http://localhost:5000/permissions").then((res) => setPermissions(res.data));
  }, []);

  // Open modal for adding/editing a role
  const handleEdit = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  // Delete a role
  const handleDelete = (roleId) => {
    axios.delete(`http://localhost:5000/roles/${roleId}`).then(() => {
      setRoles(roles.filter((role) => role.id !== roleId));
    });
  };

  // Handle form submission for adding/editing roles
  const handleFormSubmit = (role) => {
    if (role.id) {
      // Update existing role
      axios.put(`http://localhost:5000/roles/${role.id}`, role).then((res) => {
        setRoles(roles.map((r) => (r.id === role.id ? res.data : r)));
      });
    } else {
      // Add new role
      axios.post("http://localhost:5000/roles", role).then((res) => {
        setRoles([...roles, res.data]);
      });
    }
    setIsModalOpen(false);
    setSelectedRole(null);
  };

  return (
    <div>
      <h1>Roles Management</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedRole(null);
          setIsModalOpen(true);
        }}
      >
        Add Role
      </Button>
      <RoleTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
      {isModalOpen && (
        <ModalForm
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={selectedRole}
          permissions={permissions}
        />
      )}
    </div>
  );
};

export default RolesPage;
