import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => (
    <div className="dashboard">
        <h2>Admin Dashboard</h2>

        <Link to="/products">View Products</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/manage-users">Manage Users</Link>
    </div>
);

export default AdminDashboard;