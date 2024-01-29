import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playlists: []
}

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        }
    },
});

export const { setPlaylists } = playlistsSlice.actions;
export default playlistsSlice.reducer;