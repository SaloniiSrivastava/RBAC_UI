import React from 'react';
import LogoutButton from './LogoutButton';

const ViewerDashboard = () => {
  return (
    <div>
      <h2>Viewer Dashboard</h2>
      <p>Welcome, Viewer! You can only view content.</p>
      <LogoutButton/>
    </div>
  );
};

export default ViewerDashboard;
