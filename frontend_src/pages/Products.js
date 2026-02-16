import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [eco, setEco] = useState("");
    const [maxPrice, setMaxPrice] = useState(10000);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const res = await API.get("/products");
        setProducts(res.data);
    };

    const addToCart = async (id) => {
        await API.post(`/cart/${id}`);
        alert("Added to cart");
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete product?")) return;
        await API.delete(`/products/${id}`);
        loadProducts();
    };

    const approveProduct = async (id) => {
        await API.put(`/products/approve/${id}`);
        loadProducts();
    };

    const applyFilter = async () => {
        let url = "/products";

        if (search)
            url = `/products/search?name=${search}`;
        else if (category)
            url = `/products/category?value=${category}`;
        else if (eco)
            url = `/products/eco?rating=${eco}`;
        else
            url = `/products/price?min=0&max=${maxPrice}`;

        const res = await API.get(url);
        setProducts(res.data);
    };

    return (
        <div className="products-container">
            <h2 className="page-title">Products</h2>

            {/* Filter bar */}
            <div className="filter-bar">

                <input
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Category</option>
                    <option value="Toys">Toys</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Plants">Plants</option>
                </select>

                <select value={eco} onChange={(e) => setEco(e.target.value)}>
                    <option value="">Eco Rating</option>
                    <option value="GREEN">GREEN</option>
                    <option value="YELLOW">YELLOW</option>
                    <option value="RED">RED</option>
                </select>

                <input
                    type="range"
                    min="0"
                    max="10000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <span>₹0 - ₹{maxPrice}</span>

                <button onClick={applyFilter}>Apply</button>
                <button onClick={loadProducts}>Reset</button>

                {/* ADDED QUICK FILTERS */}
                <button onClick={async () => {
                    const res = await API.get("/products/eco/friendly");
                    setProducts(res.data);
                }}>
                    Eco Friendly 🌱
                </button>

                <button onClick={async () => {
                    const res = await API.get("/products/eco/not-friendly");
                    setProducts(res.data);
                }}>
                    Not Eco ❌
                </button>
            </div>

            {/* Products */}
            <div className="products-grid">
                {products.map((p) => (
                    <div key={p.id} className="product-card">

            <span className={`eco-badge eco-${p.ecoRating?.toLowerCase()}`}>
              {p.ecoRating}
            </span>

                        <span className={`status ${p.status}`}>
              {p.status}
            </span>

                        <div
                            className="image-wrapper"
                            onClick={() => navigate(`/products/${p.id}`)}
                        >
                            <img src={p.imageUrl} alt={p.name} />
                        </div>

                        <div className="product-info">
                            <h3>{p.name}</h3>
                            <p>{p.category}</p>
                            <p>₹{p.price}</p>
                        </div>

                        <div className="actions">
                            {role === "USER" && (
                                <button onClick={() => addToCart(p.id)}>Add to Cart</button>
                            )}

                            {role === "SELLER" && (
                                <>
                                    <button onClick={() => navigate(`/add-product?id=${p.id}`)}>
                                        Update
                                    </button>
                                    <button onClick={() => deleteProduct(p.id)}>
                                        Delete
                                    </button>
                                </>
                            )}

                            {role === "ADMIN" && (
                                <>
                                    {p.status === "PENDING" && (
                                        <button onClick={() => approveProduct(p.id)}>
                                            Approve
                                        </button>
                                    )}
                                    <button onClick={() => deleteProduct(p.id)}>
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;