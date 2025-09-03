import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    email: string;
    type: string;
}

interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}


const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetUser: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { setUser, setLoading, setError, resetUser } = userSlice.actions;
export default userSlice.reducer;