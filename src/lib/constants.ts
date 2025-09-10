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
        GET_PRODUCT_BY_SUB_CATEGORY: `${API_URL}/products/sub-category/:subCategory`,
        UPDATE_PRODUCT: `${API_URL}/products/:id`,
        DELETE_PRODUCT: `${API_URL}/products/:id`,
    },
    CUSTOMERS: {
        GET_ALL_CUSTOMERS: `${API_URL}/customers`,
        GET_CUSTOMER_BY_ID: `${API_URL}/customers/:id`,
        UPDATE_CUSTOMER: `${API_URL}/customers/:id`,
        DELETE_CUSTOMER: `${API_URL}/customers/:id`,
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