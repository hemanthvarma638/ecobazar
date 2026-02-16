import React from "react";
import { Link } from "react-router-dom";

const BuyerDashboard = () => (
    <div className="dashboard">
        <h2>Buyer Dashboard</h2>

        <Link to="/products">View Products</Link>
    </div>
);

export default BuyerDashboard;