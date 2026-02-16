import { getToken } from "../utils/auth";

export const getProducts = async () => {
    const token = getToken();

    const res = await fetch("http://localhost:8080/products", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        console.error("Products API failed", res.status);
        return [];
    }

    return res.json();
};
