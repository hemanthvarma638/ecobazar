import React from "react";
import { Navigate } from "react-router-dom";

const SellerRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role !== "SELLER") {
        return <Navigate to="/products" />;
    }

    return children;
};

export default SellerRoute;