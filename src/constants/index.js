/** Application constants - single source for currency, routes, and config */

export const CURRENCY = "Birr";

export const ROUTES = {
    HOME: "/",
    MENU: "/menu",
    CART: "/cart",
    SUCCESS: "/success",
};

const rawApiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

export const API_ENDPOINTS = {
    MENU: `${API_BASE_URL}/api/menu`,
    ORDERS: `${API_BASE_URL}/api/orders`,
};