import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    musics: [], // all the musics
    currentMusics:[], // the musics that are currently being displayed
    currentIndex: 0 // the index of the current musics displayed
}

export const musicsSlice = createSlice({
    name: 'musics',
    initialState,
    reducers: {
        setMusics: (state, action) => {
            state.musics = action.payload;
        },
        setCurrentMusics: (state, action) => {
            state.currentMusics = action.payload;
        },
        setCurrentIndex: (state, action) => {
            state.currentIndex = action.payload;
        }
    },
});

export const { setMusics, setCurrentMusics, setCurrentIndex } = musicsSlice.actions;
export default musicsSlice.reducer;