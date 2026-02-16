import React, { useState } from "react";
import { addProduct } from "../api/api";

function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        carbonImpact: "",
        rating: "",
        imageUrl: ""
    });

    const submit = async (e) => {
        e.preventDefault();

        await addProduct({
            ...form,
            price: Number(form.price),
            carbonImpact: Number(form.carbonImpact),
            rating: Number(form.rating),
            ecoCertified: false
        });

        alert("✅ Product added successfully");

        setForm({
            name: "",
            description: "",
            category: "",
            price: "",
            carbonImpact: "",
            rating: "",
            imageUrl: ""
        });
    };

    return (
        <div className="form-container">
            <h2>Add Product</h2>

            <form onSubmit={submit}>
                <input
                    placeholder="Product Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Description"
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <input
                    placeholder="Category"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Price"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Carbon Impact (kg CO₂)"
                    required
                    value={form.carbonImpact}
                    onChange={(e) => setForm({ ...form, carbonImpact: e.target.value })}
                />

                {/*  ADDED */}
                <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.5"
                    placeholder="Rating (1 - 5)"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                />

                <input
                    placeholder="Image URL (https://...)"
                    required
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                />

                <button>Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;