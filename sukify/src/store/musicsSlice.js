import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    musics: []
}

export const musicsSlice = createSlice({
    name: 'musics',
    initialState,
    reducers: {
        setMusics: (state, action) => {
            state.musics = action.payload;
        }
    },
});

export const { setMusics } = musicsSlice.actions;
export default musicsSlice.reducer;