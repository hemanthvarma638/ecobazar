import React, { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";



function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        address: "",
        location: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();

        if (form.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            await registerUser(form);
            alert("Registered Successfully");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>



            <form onSubmit={submit}>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="address" placeholder="Address" onChange={handleChange} required />
                <input name="location" placeholder="Location" onChange={handleChange} required />

                <button>Register</button>
            </form>
        </div>
    );

}

export default Register;