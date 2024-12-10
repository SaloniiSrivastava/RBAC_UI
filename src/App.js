import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import EditorDashboard from './components/EditorDashboard';
import ViewerDashboard from './components/ViewerDashboard';
import ProtectedRoute from "./ProtectedRoute";
import Forbidden from "./components/Fobridden";
import InactiveAccount from "./components/InactiveAccount";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/editor-dashboard" element={<EditorDashboard />} />
        <Route path="/viewer-dashboard" element={<ViewerDashboard />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/inactive" element={<InactiveAccount />} />
      </Routes>
    </Router>
  );
};

export default App;
