import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve logged-in user details

    if (!user) {
        // If not logged in, redirect to login page
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(user.role)) {
        // If the role doesn't match, redirect to a Forbidden page or default dashboard
        return <Navigate to="/403" />;
    }
    if (user.status !== "active") {
        return <Navigate to="/inactive" />; // Redirect to a "Your account is inactive" page
    }


    return children; // Render the protected component
};

export default ProtectedRoute;

