import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    log: {}, // log message
}

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setLog: (state, action) => {
            state.log = action.payload;
        },
    },
});

export const { setLog } = apiSlice.actions;
export default apiSlice.reducer;