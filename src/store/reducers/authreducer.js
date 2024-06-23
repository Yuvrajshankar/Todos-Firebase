import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        edit: (state, action) => {
            if (state.user && state.user.uid === action.payload.uid) {
                state.user = { ...state.user, ...action.payload.updatedData };
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        deleteAccount: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
});

export const { login, edit, logout, deleteAccount } = authSlice.actions;
export default authSlice.reducer;