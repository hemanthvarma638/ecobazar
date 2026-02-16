import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

/* Auth */
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

/* Products */
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const addProduct = (data) => API.post("/products", data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

/* Cart */
export const addToCart = (productId) => API.post(`/cart/${productId}`);
export const getCart = () => API.get("/cart");
export const updateCartQty = (itemId, qty) =>
    API.put(`/cart/${itemId}/${qty}`);
export const removeCartItem = (itemId) =>
    API.delete(`/cart/${itemId}`);

/* Admin */
export const getAllUsers = () => API.get("/admin/users");
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

export default API;