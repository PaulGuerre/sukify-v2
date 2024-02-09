import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    musics: [],
    currentMusics:[],
    currentMusic: {},
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
        setCurrentMusic: (state, action) => {
            state.currentMusic = action.payload;
        },
        setCurrentIndex: (state, action) => {
            state.currentIndex = action.payload;
        }
    },
});

export const { setMusics, setCurrentMusics, setCurrentMusic, setCurrentIndex } = musicsSlice.actions;
export default musicsSlice.reducer;