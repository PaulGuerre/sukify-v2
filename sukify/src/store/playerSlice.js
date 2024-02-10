import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlaying: false
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setIsPlaying: (state, action) => {
            console.log("state updated", action.payload);
            state.isPlaying = action.payload;
        }
    },
});

export const { setIsPlaying } = playerSlice.actions;
export default playerSlice.reducer;