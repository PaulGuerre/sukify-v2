const express = require('express');
const cors = require('cors');

const { downloadMP3, searchVideoByName, getMusicDuration } = require('./ytb-scraper');
const { connectDatabase, insertMusic, insertPlaylist, updatePlaylist, deletePlaylist, deleteMusic, updateMusic, insertPlaylistMusic, getMusics, getPlaylists, getPlayistMusics } = require('./databaseManager');

require('dotenv').config({ path: 'credentials.env' });
const thumbnailFolder = process.env.THUMBNAILS_FOLDER;

const app = express();
const port = 7000;

connectDatabase();

/**
 * CORS
 */
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

/**
 * Download the video based on the videoName provided, or the url
 */
app.post('/download', (req, res) => {
    const videoName = req.query.videoName;

    if (!videoName) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    searchVideoByName(videoName).then(({ videoID, videoTitle }) => {
        const music = { musicID: videoID, musicTitle: videoTitle };

        downloadMP3(videoID).then(() => {
            getMusicDuration(videoID).then((duration) => {
                music.musicDuration = duration;

                insertMusic(music).then(() => {
                    console.log('Video downloaded as MP3 successfully');
                    res.status(200).send('Video downloaded as MP3 successfully');
                }).catch((err) => {
                    console.log('Error: ' + err);
                    res.status(500).send('Video already downloaded');
                });
            });
        }).catch((err) => {
            console.log('Error: ' + err);
            res.status(500).send('Error while downloading the music');
        });
    }).catch((err) => {
        console.log('Error: ' + err);
        res.status(500).send('Error while searching the music');
    });
});

/**
 * Create a playlist
 */
app.post('/createPlaylist', (req, res) => {
    const playlistName = req.query.playlistName;

    if (!playlistName) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    insertPlaylist(playlistName).then(() => {
        console.log('Playlist successfully created');
        res.status(200).send("Playlist successfully creayed");
    }).catch((err) => {
        console.log('Error: ' + err);
        res.status(500).send('Error while creating playlist');
    });
});

/**
 * Update either the name or the thumbnail of the playlist, or both
 */
app.put('/updatePlaylist/:playlistID', (req, res) => {
    const newPlaylist = { playlistID: req.params.playlistID, newName: req.query.newName };

    if (!newPlaylist.newName) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    updatePlaylist(newPlaylist).then((results) => {
        if (results.affectedRows) {
            console.log('Playlist updated successfully');
            res.status(200).send('Playlist updated successfully');
        }
        console.log('The playlist does not exist');
        res.status(200).send('The playlist does not exist');
    }).catch((err) => {
        console.log('Error:' + err);
        res.status(500).send('Error while updating playlist');
    });
});

/**
 * Delete a playlist
 */
app.delete('/deletePlaylist/:playlistID', (req, res) => {
    const playlistID = req.params.playlistID;

    deletePlaylist(playlistID).then((results) => {
        if (results.affectedRows) {
            console.log('Playlist successfully deleted');
            res.status(200).send('Playlist successfully deleted');
        }
        console.log('The playlist does not exist');
        res.send('The playlist does not exist');
    }).catch((err) => {
        console.log('Error :' + err);
        res.status(500).send('Error while deleting playlist');
    });
});

/**
 * Delete a music
 */
app.delete('/deleteMusic/:musicID', (req, res) => {
    const musicID = req.params.musicID;

    deleteMusic(musicID).then((results) => {
        if (results.affectedRows) {
            console.log('Music successfully deleted');
            res.status(200).send('Music successfully deleted');
        }
        console.log('The music does not exist');
        res.status(200).send('The music does not exist');
    }).catch((err) => {
        console.log('Error :' + err);
        res.status(500).send('Error while deleting music');
    });
});

/**
 * Update a music
 */
app.put('/updateMusic/:musicID', (req, res) => {
    const music = { musicID: req.params.musicID, musicTitle: req.query.newName };

    if (!music.musicTitle) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    updateMusic(music).then((results) => {
        if (results.affectedRows) {
            console.log('Music updated successfully');
            res.status(200).send('Music updated successfully');
        }
        console.log('The music does not exist');
        res.status(500).send('The music does not exist');
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(500).send('Error while updating music');
    });
});

/**
 * Add a music to a playlist
 */
app.post('/addPlaylistMusic', (req, res) => {
    const playlistMusic = { playlistID: req.query.playlistID, musicID: req.query.musicID };

    if (!playlistMusic.playlistID || !playlistMusic.musicID) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    insertPlaylistMusic(playlistMusic).then(() => {
        console.log('Music successfully added to playlist');
        res.status(200).send('Music successfully added to playlist');
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(500).send('Error while adding music to playlist');
    });
});

/**
 * Get musics depending on the offset and the limit
 */
app.get('/getMusics', (req, res) => {
    const range = { limit: req.query.limit, offset: req.query.offset };

    if (!range.limit || !range.offset) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    getMusics(range).then((results) => {
        console.log('Musics retrieved');
        res.status(200).send(results);
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(500).send('Error while retrieving the musics');
    });
});

/**
 * Get playlists depending on the offset and the limit
 */
app.get('/getPlaylists', (req, res) => {
    const range = { limit: req.query.limit, offset: req.query.offset };

    if (!range.limit || !range.offset) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    getPlaylists(range).then((results) => {
        console.log('Playlists retrieved');
        res.status(200).send(results);
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(500).send('Error while retrieving the playlists');
    });
});

/**
 * Get the playlist musics depending on the offset and the limit
 */
app.get('/getPlaylist/:playlistID', (req, res) => {
    const data = { playlistID: req.params.playlistID, limit: req.query.limit, offset: req.query.offset };

    if (!data.limit || !data.offset) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    getPlayistMusics(data).then((results) => {
        console.log('Playlist musics retrieved');
        res.status(200).send(results);
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(500).send('Error while retrieving the playlist musics');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
