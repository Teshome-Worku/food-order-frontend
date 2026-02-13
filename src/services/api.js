/** API service - single place for backend calls */

import {
    API_ENDPOINTS,
    STORAGE_KEYS
} from "../constants";

async function fetchJson(url, options = {}) {
    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data?.message || `Request failed (${res.status})`);
    }

    return data;
}

async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
    return fetchJson(url, {
        ...options,
        headers: {
            ...options.headers,
            ...(token && {
                Authorization: `Bearer ${token}`
            }),
        },
    });
}

export const api = {
    getMenu: () => fetchJson(API_ENDPOINTS.MENU),

    createOrder: (order) =>
        fetchJson(API_ENDPOINTS.ORDERS, {
            method: "POST",
            body: JSON.stringify(order),
        }),

    getOrders: () => fetchWithAuth(API_ENDPOINTS.ORDERS),

    adminLogin: (email, password) =>
        fetchJson(API_ENDPOINTS.ADMIN_LOGIN, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
        }),
};