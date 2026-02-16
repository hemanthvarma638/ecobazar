import React, { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ username, password });

            //  Save token
            localStorage.setItem("token", res.data.token);

            //  Decode role from JWT
            const payload = JSON.parse(atob(res.data.token.split(".")[1]));
            localStorage.setItem("role", payload.role);

            navigate("/products");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-box" onSubmit={submit}>
                <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;