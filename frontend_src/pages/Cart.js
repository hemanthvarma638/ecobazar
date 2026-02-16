import React, { useEffect, useState } from "react";
import { getCart, updateCartQty, removeCartItem } from "../api/api";
import "../styles/Cart.css";

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    const loadCart = () => {
        getCart()
            .then(res => setCartItems(res.data))
            .catch(() => alert("Unauthorized"));
    };

    useEffect(() => {
        loadCart();
    }, []);

    return (
        <div className="cart-container">
            <h2>My Cart</h2>

            {cartItems.length === 0 && <p>Cart is empty</p>}

            {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                    <img src={item.product.imageUrl} alt={item.product.name} />

                    <div className="cart-info">
                        <h4>{item.product.name}</h4>
                        <p>₹{item.product.price}</p>

                        <div className="qty-controls">
                            <button onClick={() =>
                                updateCartQty(item.id, item.quantity - 1).then(loadCart)
                            }>-</button>

                            <span>{item.quantity}</span>

                            <button onClick={() =>
                                updateCartQty(item.id, item.quantity + 1).then(loadCart)
                            }>+</button>
                        </div>

                        <button
                            className="remove-btn"
                            onClick={() =>
                                removeCartItem(item.id).then(loadCart)
                            }
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cart;