import { configureStore } from "@reduxjs/toolkit";
import musicsSlice from "./musicsSlice";
import playlistsSlice from "./playlistsSlice";
import playerSlice from "./playerSlice";

export const store = configureStore({
    reducer: {
        musics: musicsSlice,
        playlists: playlistsSlice,
        player: playerSlice
    },
    devTools: true,
});