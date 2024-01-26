'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playlists: [],
    currentPlaylist: {}
}

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        },
        setCurrentPlaylist: (state, action) => {
            state.currentPlaylist = action.payload;
        }
    },
});

export const { setPlaylists, setCurrentPlaylist } = playlistsSlice.actions;
export default playlistsSlice.reducer;