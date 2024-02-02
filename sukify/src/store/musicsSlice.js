import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    musics: [],
    currentMusics:[],
    currentIndex: 0
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