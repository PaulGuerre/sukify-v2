import { configureStore } from "@reduxjs/toolkit";
import musicsSlice from "./musicsSlice";
import playlistsSlice from "./playlistsSlice";

export const store = configureStore({
    reducer: {
        musics: musicsSlice,
        playlists: playlistsSlice
    },
    devTools: true,
});