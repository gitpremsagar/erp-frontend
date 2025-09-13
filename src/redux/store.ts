import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productTagsReducer from "./slices/productTagsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        categories: categoriesReducer,
        productTags: productTagsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;