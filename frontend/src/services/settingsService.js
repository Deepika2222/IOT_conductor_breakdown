import { API_BASE_URL } from "../config/api";

// GET settings
export const fetchSettings = async () => {
    const res = await fetch(`${API_BASE_URL}/settings`);
    const data = await res.json();

    if (!data.success) throw new Error(data.error);

    return data; // ✅ return full response
};

// POST settings
export const updateSettings = async (payload) => {
    const res = await fetch(`${API_BASE_URL}/settings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) throw new Error(data.error);

    return data; // ✅ return full response
};