// ModalForm.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const ModalForm = ({ open, onClose, onSubmit, initialData, permissions = [] }) => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    if (initialData) {
      setRoleName(initialData.name || "");
      setSelectedPermissions(initialData.permissions || []);
    } else {
      setRoleName("");
      setSelectedPermissions([]);
    }
  }, [initialData]);

  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    if (typeof onSubmit !== "function") {
      console.error("onSubmit is not a function");
      return;
    }

    const formData = {
      id: initialData?.id || undefined,
      name: roleName,
      permissions: selectedPermissions,
    };

    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          {initialData ? "Edit Role" : "Add Role"}
        </Typography>
        <TextField
          fullWidth
          label="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          margin="normal"
        />
        <Typography variant="subtitle1" gutterBottom>
          Permissions
        </Typography>
        <FormGroup>
          {Array.isArray(permissions) && permissions.length > 0 ? (
            permissions.map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={selectedPermissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                }
                label={permission}
              />
            ))
          ) : (
            <Typography>No permissions available</Typography>
          )}
        </FormGroup>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const ParentComponent = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleRoleSubmit = (formData) => {
    console.log("Role Data Submitted:", formData);
    // Handle form submission here, e.g., send data to the backend
  };

  const permissionsList = ["read", "write", "delete"];

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Open Role Modal</button>
      <ModalForm
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleRoleSubmit}
        initialData={{ name: "Admin", permissions: ["read", "write"] }}
        permissions={permissionsList}
      />
    </div>
  );
};

export default ParentComponent;
