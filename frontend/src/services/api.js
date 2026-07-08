import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export const apiRequest = async (endpoint, method = "GET", data = null) => {
    try {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (data && method !== "GET") {
            options.body = JSON.stringify(data);
        }

        const res = await fetch(`${BASE_URL}${endpoint}`, options);

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.detail || "Something went wrong");
        }

        return result;
    } catch (err) {
        console.error("API Error:", err.message);
        return null;
    }
};

export const apiGet = (url) => apiRequest(url, "GET");
export const apiPost = (url, data) => apiRequest(url, "POST", data);
export const apiPut = (url, data) => apiRequest(url, "PUT", data);
export const apiDelete = (url) => apiRequest(url, "DELETE");