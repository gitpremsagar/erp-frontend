import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
}

interface AuthPayload {
    isAuthenticated: boolean;
    accessToken: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthPayload>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.accessToken = action.payload.accessToken;
        },
        resetAuthState: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
        },
    },
});

export const { setAuthState, resetAuthState } = authSlice.actions;
export default authSlice.reducer;