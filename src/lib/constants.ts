// export const BASE_API_URL = "http://localhost:3008";
export const BASE_API_URL = "https://erp-backend-blond.vercel.app";

export const API_URL = `${BASE_API_URL}/api`;

export const API = {
    AUTH:{
        LOGIN: `${API_URL}/auth/log-in`,
        SIGNUP: `${API_URL}/auth/sign-up`,
        LOGOUT: `${API_URL}/auth/log-out`,
        REFRESH_ACCESS_TOKEN: `${API_URL}/auth/refresh-access-token`,
        FORGOT_PASSWORD: `${API_URL}/auth/forgot-password`,
        RESET_PASSWORD: `${API_URL}/auth/reset-password`,
        VERIFY_EMAIL_OTP: `${API_URL}/auth/verify-email-otp`,
        VERIFY_MOBILE_NUMBER_OTP: `${API_URL}/auth/verify-mobile-number-otp`,
    },
    PRODUCTS: {
        CREATE_PRODUCT: `${API_URL}/products`,
        GET_ALL_PRODUCTS: `${API_URL}/products`,
        GET_PRODUCT_BY_ID: `${API_URL}/products/:id`,
        GET_PRODUCT_BY_CATEGORY: `${API_URL}/products/category/:category`,
        UPDATE_PRODUCT: `${API_URL}/products/:id`,
        DELETE_PRODUCT: `${API_URL}/products/:id`,
    },
    PRODUCT_TAGS: {
        CREATE_PRODUCT_TAG: `${API_URL}/product-tags`,
        GET_ALL_PRODUCT_TAGS: `${API_URL}/product-tags`,
        GET_PRODUCT_TAG_BY_ID: `${API_URL}/product-tags/:id`,
        UPDATE_PRODUCT_TAG: `${API_URL}/product-tags/:id`,
        DELETE_PRODUCT_TAG: `${API_URL}/product-tags/:id`
    },
    CATEGORIES: {
        CREATE_CATEGORY: `${API_URL}/categories`,
        GET_ALL_CATEGORIES: `${API_URL}/categories`,
        GET_CATEGORY_BY_ID: `${API_URL}/categories/:id`,
        UPDATE_CATEGORY: `${API_URL}/categories/:id`,
        DELETE_CATEGORY: `${API_URL}/categories/:id`,
    },
    CUSTOMERS: {
        CREATE_CUSTOMER: `${API_URL}/customers`,
        GET_ALL_CUSTOMERS: `${API_URL}/customers`,
        GET_CUSTOMER_BY_ID: `${API_URL}/customers/:id`,
        UPDATE_CUSTOMER: `${API_URL}/customers/:id`,
        DELETE_CUSTOMER: `${API_URL}/customers/:id`,
    },    
    VEHICLES: {
        CREATE_VEHICLE: `${API_URL}/vehicles`,
        GET_ALL_VEHICLES: `${API_URL}/vehicles`,
        GET_VEHICLE_BY_ID: `${API_URL}/vehicles/:id`,
        UPDATE_VEHICLE: `${API_URL}/vehicles/:id`,
        DELETE_VEHICLE: `${API_URL}/vehicles/:id`,
    },
    ORDERS: {
        GET_ALL_ORDERS: `${API_URL}/orders`,
        GET_ORDER_BY_ID: `${API_URL}/orders/:id`,
    },
    ORDER_ITEMS: {
        GET_ALL_ORDER_ITEMS: `${API_URL}/order-items`,
        GET_ORDER_ITEMS_BY_ORDER_ID: `${API_URL}/order-items`,
    }
}