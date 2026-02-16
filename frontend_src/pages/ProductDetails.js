import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import StarRating from "../components/StarRating";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const role = localStorage.getItem("role");

    useEffect(() => {
        API.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(() => alert("Product not found"));
    }, [id]);

    const addToCart = async () => {
        await API.post(`/cart/${product.id}`);
        alert("Added to cart");
    };

    if (!product) return <h2>Loading...</h2>;

    return (
        <div className="products-container">
            <div className="product-card" style={{ maxWidth: 600, margin: "auto" }}>
                <img src={product.imageUrl} alt={product.name} />

                <div className="product-info">
                    <h3>{product.name}</h3>
                    <p><b>Category:</b> {product.category}</p>
                    <p><b>Price:</b> ₹{product.price}</p>

                    {/*ADDED PART */}
                    <p><b>Description:</b> {product.description}</p>

                    <p>
                        <b>Carbon Emission:</b>{" "}
                        {product.carbonImpact} kg CO₂ / item
                    </p>

                    <p>
                        <b>Eco Rating:</b> {product.ecoRating}
                    </p>

                    <p>
                        <b>User Rating:</b>
                        <StarRating value={product.rating || 3} />
                    </p>

                    {/* User only */}
                    {role === "USER" && (
                        <button onClick={addToCart}>Add to Cart</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;