import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    userDetails: JSON.parse(localStorage.getItem('user')) ?? {},
};

const outSlice = createSlice({
    name: 'userOut',
    initialState: INITIAL_STATE,

    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        clearUserDetails: (state) => {
            state.userDetails = {}; // Reset user details
        },
        // Add any other actions you need, e.g., setUserRole
    },
});

export const { setUserDetails, clearUserDetails } = outSlice.actions;
export default outSlice.reducer;
