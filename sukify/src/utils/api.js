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
    return sendRequest('put', `http://localhost:7000/updatePlaylist/${playlistID}?newName=${newName}`, token).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while renaming the playlist', status: 400 };
    });
}

export const deletePlaylist = (playlistID) => {
    return sendRequest('delete', `http://localhost:7000/deletePlaylist/${playlistID}`, token).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while deleting the playlist', status: 400 };
    });
}

export const updateMusic = (musicID, newName) => {
    return sendRequest('put', `http://localhost:7000/updateMusic/${musicID}?newName=${newName}`, token).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while renaming the music', status: 400 };
    });
}

export const deleteMusic = (musicID) => {
    return sendRequest('delete', `http://localhost:7000/deleteMusic/${musicID}`, token).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while deleting the music', status: 400 };
    });
}

export const deleteMusicFromPlaylist = (playlistID, musicID) => {
    return sendRequest('delete', `http://localhost:7000/deletePlaylist/${playlistID}/music/${musicID}`, token).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while deleting the music from the playlist', status: 400 };
    });
}

export const addMusicToPlaylist = (playlistID, musicID) => {
    return sendRequest('post', `http://localhost:7000/addPlaylist/${playlistID}/music/${musicID}`, token).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while adding the music to the playlist', status: 400 };
    });
}

export const downloadMusic = (musicTitle) => {
    return sendRequest('post', `http://localhost:7000/download?videoName=${musicTitle}`, token).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while downloading the music', status: 400 };
    });
}

export const createPlaylist = (playlistName) => {
    return sendRequest('post', `http://localhost:7000/createPlaylist?playlistName=${playlistName}`, token).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while creating the playlist', status: 400 };
    });
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
