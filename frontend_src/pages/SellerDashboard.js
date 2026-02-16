import React from "react";
import { Link } from "react-router-dom";

const SellerDashboard = () => (
    <div className="dashboard">
        <h2>Seller Dashboard</h2>

        <Link to="/products">View Products</Link>
        <Link to="/add-product">Add Product</Link>
    </div>
);

export default SellerDashboard;