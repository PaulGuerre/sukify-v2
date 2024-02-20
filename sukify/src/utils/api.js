'use server'

import axios from 'axios';
import { getCookie } from 'cookies-next';

const token = getCookie('token');

export const getToken = (username, password) => {
    return axios.post(`http://localhost:7000/login`, { username, password });
}

export const getMusic = (musicID) => {
    return sendRequest('get', `http://localhost:7000/getMusic/${musicID}`, token, 'blob');
}

export const getMusics = (limit, offset) => {
    return sendRequest('get', `http://localhost:7000/getMusics?limit=${limit}&offset=${offset}`, token);
}

export const getPlaylists = () => {
    return sendRequest('get', `http://localhost:7000/getPlaylists`, token);
}

export const getPlaylistMusics = (playlistID, limit, offset) => {
    return sendRequest('get', `http://localhost:7000/getPlaylistMusics/${playlistID}?limit=${limit}&offset=${offset}`, token);
}

export const updatePlaylist = (playlistID, newName) => {
    return sendRequest('put', `http://localhost:7000/updatePlaylist/${playlistID}?newName=${newName}`, token);
}

export const deletePlaylist = (playlistID) => {
    return sendRequest('delete', `http://localhost:7000/deletePlaylist/${playlistID}`, token);
}

export const updateMusic = (musicID, newName) => {
    return sendRequest('put', `http://localhost:7000/updateMusic/${musicID}?newName=${newName}`, token);
}

export const deleteMusic = (musicID) => {
    return sendRequest('delete', `http://localhost:7000/deleteMusic/${musicID}`, token);
}

export const deleteMusicFromPlaylist = (playlistID, musicID) => {
    return sendRequest('delete', `http://localhost:7000/deletePlaylist/${playlistID}/music/${musicID}`, token);
}

export const addMusicToPlaylist = (playlistID, musicID) => {
    return sendRequest('post', `http://localhost:7000/addPlaylist/${playlistID}/music/${musicID}`, token);
}

export const downloadMusic = (musicTitle) => {
    return sendRequest('post', `http://localhost:7000/download?videoName=${musicTitle}`, token);
}

export const createPlaylist = (playlistName) => {
    return sendRequest('post', `http://localhost:7000/createPlaylist?playlistName=${playlistName}`, token);
}

const sendRequest = (method, url, token, responseType) => {
    return axios({
        method,
        url,
        responseType,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
