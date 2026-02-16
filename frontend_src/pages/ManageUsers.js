import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/api";
import "../styles/ManageUsers.css";



function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
            .then(res => setUsers(res.data))
            .catch(() => alert("Access denied"));
    }, []);

    const removeUser = async (id) => {
        await deleteUser(id);
        setUsers(users.filter(u => u.id !== id));
    };

    return (
        <div className="container">
            <h2>Manage Users</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th><th>Username</th><th>Role</th><th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.role}</td>
                        <td>
                            <button onClick={() => removeUser(u.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageUsers;