import axios from 'axios';

export const getMusics = (limit, offset) => {
    return axios.get(`http://localhost:7000/getMusics?limit=${limit}&offset=${offset}`);
}

export const getPlaylists = (limit, offset) => {
    return axios.get(`http://localhost:7000/getPlaylists?limit=${limit}&offset=${offset}`);
}

export const getPlaylist = (playlistID) => {
    return axios.get(`http://localhost:7000/getPlaylist/${playlistID}`);
}

export const getPlaylistMusics = (playlistID, limit, offset) => {
    return axios.get(`http://localhost:7000/getPlaylistMusics/${playlistID}?limit=${limit}&offset=${offset}`);
}
