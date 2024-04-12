import { configureStore } from "@reduxjs/toolkit";
import musicsSlice from "./musicsSlice";
import playlistsSlice from "./playlistsSlice";
import playerSlice from "./playerSlice";
import apiSlice from "./apiSlice";

export const store = configureStore({
    reducer: {
        musics: musicsSlice,
        playlists: playlistsSlice,
        player: playerSlice,
        api: apiSlice,
    },
    devTools: true,
});