export const API_BASE_URL = "https://api.escuelajs.co/api/v1";

export const Endpoints = {
  AUTH: {
    LOGIN: "/auth/login",
    PROFILE: "/auth/profile",
    SIGNUP: "/users",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
  },
  CATEGORIES: "/categories",
  PRODUCTS: "/products",
} as const;
