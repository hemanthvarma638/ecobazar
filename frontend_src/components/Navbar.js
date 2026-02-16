import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            {!token && (
                <>
                    <Link to="/login">Login</Link> |{" "}
                    <Link to="/register">Register</Link>
                </>
            )}

            {token && (
                <>
                    <Link to="/products">Products</Link>

                    {/*Admin */}
                    {role === "ADMIN" && (
                        <>
                            {" | "}
                            <Link to="/add-product">Add Product</Link>
                            {" | "}
                            <Link to="/manage-users">Manage Users</Link>
                        </>
                    )}

                    {/* Seller */}
                    {role === "SELLER" && (
                        <>
                            {" | "}
                            <Link to="/add-product">Add Product</Link>
                        </>
                    )}


                    {role === "USER" && (
                        <>
                            {" | "}
                            <Link to="/cart">Cart</Link>
                        </>
                    )}

                    {" | "}
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;