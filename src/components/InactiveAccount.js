import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/InactiveAccount.css"

const InactiveAccount = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session and redirect to login
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Account Inactive</h1>
            <p>Your account is currently inactive. Please contact your administrator for assistance.</p>
            <p className="href"
                onClick={handleLogout}

            >
                Go Back
            </p>
        </div>
    );
};

export default InactiveAccount;
