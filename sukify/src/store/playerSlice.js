import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlaying: false, // is the player playing a music
    playingMusics: [], // the musics that are currently being played
    playingPlaylist: {}, // the playlist that is currently being played
    currentMusic: {}, // the music that is currently being played
    musicMode: 'repeat' // the music mode (repeat, shuffle)
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setPlayingMusics: (state, action) => {
            state.playingMusics = action.payload;
        },
        setPlayingPlaylist: (state, action) => {
            state.playingPlaylist = action.payload;
        },
        setCurrentMusic: (state, action) => {
            state.currentMusic = action.payload;
        },
        setMusicMode: (state, action) => {
            state.musicMode = action.payload;
        }
    },
});

export const { setIsPlaying, setPlayingMusics, setPlayingPlaylist, setCurrentMusic, setMusicMode } = playerSlice.actions;
export default playerSlice.reducer;