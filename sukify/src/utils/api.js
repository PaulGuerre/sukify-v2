import axios from 'axios';

export const getMusics = (limit, offset) => {
    return axios.get(`http://localhost:7000/getMusics?limit=${limit}&offset=${offset}`);
}

export const getPlaylists = (limit, offset) => {
    return axios.get(`http://localhost:7000/getPlaylists?limit=${limit}&offset=${offset}`);
}

export const getPlaylistMusics = (playlistID, limit, offset) => {
    return axios.get(`http://localhost:7000/getPlaylistMusics/${playlistID}?limit=${limit}&offset=${offset}`);
}

export const updatePlaylist = (playlistID, newName) => {
    return axios.put(`http://localhost:7000/updatePlaylist/${playlistID}?newName=${newName}`);
}

export const deletePlaylist = (playlistID) => {
    return axios.delete(`http://localhost:7000/deletePlaylist/${playlistID}`);
}

export const updateMusic = (musicID, newName) => {
    return axios.put(`http://localhost:7000/updateMusic/${musicID}?newName=${newName}`);
}

export const deleteMusic = (musicID) => {
    return axios.delete(`http://localhost:7000/deleteMusic/${musicID}`);
}

export const deleteMusicFromPlaylist = (playlistID, musicID) => {
    return axios.delete(`http://localhost:7000/deletePlaylist/${playlistID}/music/${musicID}`);
}

export const addMusicToPlaylist = (playlistID, musicID) => {
    return axios.post(`http://localhost:7000/addPlaylist/${playlistID}/music/${musicID}`);
}
