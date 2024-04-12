const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: process.env.ENV_FILE === 'docker' ? '.env.docker' : '.env.local' });
const musicsFolder = process.env.MUSICS_FOLDER; 

const { downloadMP3, searchVideoByName, getMusicDuration } = require('./ytb-scraper');
const { connectDatabase, insertMusic, insertPlaylist, updatePlaylist, deletePlaylist, deleteMusic, updateMusic, insertPlaylistMusic, getMusics, getPlaylists, getPlaylist, getPlaylistMusics, deletePlaylistMusic, getUser } = require('./databaseManager');

const app = express();
const port = 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database and retry if it fails
const connectDatabaseWithRetry = () => {
    connectDatabase()
        .then(() => {
            console.log('Database connected');
        })
        .catch((err) => {
            console.error('Error while connecting to the database:', err);
            setTimeout(connectDatabaseWithRetry, 5000);
        });
};

/**
 * CORS
 */
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

/**
 * Check the token
 */
const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log('Error : ' + err);
        return res.sendStatus(403);
      }
      
      next();
    });
  };

/**
 * Login the user and return a token
 */
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        console.log('Error : missing parameters');
        return res.status(400).send('Missing parameters');
    }

    getUser(username).then((user) => {
        if (user) {
            bcrypt.compare(password, user.password).then((result) => {
                if (result) {
                    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });
                    console.log('User logged in');
                    return res.status(200).send(token);
                }
                console.log('Invalid password');
                res.status(400).send('Invalid password');
            });
        } else {
            console.log('User does not exist');
            res.status(400).send('User does not exist');
        }
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(400).send('Error while logging in');
    });
});

/**
 * Download the video based on the videoName provided, or the url
 */
app.post('/download', checkToken, (req, res) => {
    const videoName = req.query.videoName;

    if (!videoName) {
        console.log('Error : missing parameters');
        return res.status(400).send('Missing parameters');
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
                    res.status(400).send('Video already downloaded');
                });
            });
        }).catch((err) => {
            console.log('Error: ' + err);
            res.status(400).send('Error while downloading the music');
        });
    }).catch((err) => {
        console.log('Error: ' + err);
        res.status(400).send('Error while searching the music');
    });
});

/**
 * Create a playlist
 */
app.post('/createPlaylist', checkToken, (req, res) => {
    const playlistName = req.query.playlistName;

    if (!playlistName) {
        console.log('Error : missing parameters');
        return res.status(400).send('Missing parameters');
    }

    insertPlaylist(playlistName).then(() => {
        console.log('Playlist successfully created');
        res.status(200).send("Playlist successfully created");
    }).catch((err) => {
        console.log('Error: ' + err);
        res.status(400).send('Error while creating playlist');
    });
});

/**
 * Update either the name or the thumbnail of the playlist, or both
 */
app.put('/updatePlaylist/:playlistID', checkToken, (req, res) => {
    const newPlaylist = { playlistID: req.params.playlistID, newName: req.query.newName };

    if (!newPlaylist.newName) {
        console.log('Error : missing parameters');
        return res.status(400).send('Missing parameters');
    }

    updatePlaylist(newPlaylist).then((results) => {
        if (results.affectedRows) {
            console.log('Playlist updated successfully');
            return res.status(200).send('Playlist updated successfully');
        }
        console.log('The playlist does not exist');
        res.status(400).send('The playlist does not exist');
    }).catch((err) => {
        console.log('Error:' + err);
        res.status(400).send('Error while updating playlist');
    });
});

/**
 * Delete a playlist
 */
app.delete('/deletePlaylist/:playlistID', checkToken, (req, res) => {
    const playlistID = req.params.playlistID;

    deletePlaylist(playlistID).then((results) => {
        if (results.affectedRows) {
            console.log('Playlist successfully deleted');
            return res.status(200).send('Playlist successfully deleted');
        }
        console.log('The playlist does not exist');
        res.status(400).send('The playlist does not exist');
    }).catch((err) => {
        console.log('Error :' + err);
        res.status(400).send('Error while deleting playlist');
    });
});

/**
 * Delete a music
 */
app.delete('/deleteMusic/:musicID', checkToken, (req, res) => {
    const musicID = req.params.musicID;

    deleteMusic(musicID).then((results) => {
        if (results.affectedRows) {
            fs.unlink(musicsFolder + musicID + '.mp3', (err) => {
                if (err) {
                    console.log('Error :' + err);
                    return res.status(400).send('Error while deleting music');
                }
                console.log('Music successfully deleted');
                return res.status(200).send('Music successfully deleted');
            });
        } else {
            console.log('The music does not exist');
            res.status(200).send('The music does not exist');
        }
    })
    .catch((err) => {
        console.log('Error :' + err);
        res.status(400).send('Error while deleting music');
    });
});

/**
 * Update a music
 */
app.put('/updateMusic/:musicID', checkToken, (req, res) => {
    const music = { musicID: req.params.musicID, musicTitle: req.query.newName };

    if (!music.musicTitle) {
        console.log('Error : missing parameters');
        return res.status(400).send('Missing parameters');
    }

    updateMusic(music).then((results) => {
        if (results.affectedRows) {
            console.log('Music updated successfully');
            return res.status(200).send('Music updated successfully');
        }
        console.log('The music does not exist');
        res.status(400).send('The music does not exist');
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(400).send('Error while updating music');
    });
});

/**
 * Add a music to a playlist
 */
app.post('/addPlaylist/:playlistID/music/:musicID', checkToken, (req, res) => {
    const playlistMusic = { playlistID: req.params.playlistID, musicID: req.params.musicID };

    insertPlaylistMusic(playlistMusic).then(() => {
        console.log('Music successfully added to playlist');
        res.status(200).send('Music successfully added to playlist');
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(400).send('Error while adding music to playlist');
    });
});

/**
 * Get musics depending on the offset and the limit
 */
app.get('/getMusics', checkToken, (req, res) => {
    const range = { limit: req.query.limit, offset: req.query.offset };

    if (!range.limit || !range.offset) {
        console.log('Error : missing parameters');
        return res.status(400).send('Missing parameters');
    }

    getMusics(range).then((results) => {
        console.log('Musics retrieved');
        res.status(200).send(results);
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(400).send('Error while retrieving the musics');
    });
});

/**
 * Get the music
 */
app.get('/getMusic/:musicID', checkToken, (req, res) => {
    const musicID = req.params.musicID;

    if (!fs.existsSync(musicsFolder + musicID + '.mp3')) {
        console.log('Error : the music does not exist');
        return res.status(400).send('The music does not exist');
    }

    console.log('Music retrieved');
    res.sendFile(musicsFolder + musicID + '.mp3');
});

/**
 * Get playlists depending on the offset and the limit
 */
app.get('/getPlaylists', checkToken, (req, res) => {
    getPlaylists().then((results) => {
        console.log('Playlists retrieved');
        res.status(200).send(results);
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(400).send('Error while retrieving the playlists');
    });
});

/**
 * Get the playlist
 */
app.get('/getPlaylist/:playlistID', checkToken, (req, res) => {
    const playlistID = req.params.playlistID;

    getPlaylist(playlistID).then((results) => {
        console.log('Playlist retrieved');
        res.status(200).send(results);
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(400).send('Error while retrieving the playlist');
    });
});

/**
 * Get the playlist musics depending on the offset and the limit
 */
app.get('/getPlaylistMusics/:playlistID', checkToken, (req, res) => {
    const data = { playlistID: req.params.playlistID, limit: req.query.limit, offset: req.query.offset };

    if (!data.limit || !data.offset) {
        console.log('Error : missing parameters');
        return res.status(400).send('Missing parameters');
    }

    getPlaylistMusics(data).then((results) => {
        console.log('Playlist musics retrieved');
        res.status(200).send(results);
    }).catch((err) => {
        console.log('Error : ' + err);
        res.status(400).send('Error while retrieving the playlist musics');
    });
});

/**
 * Delete the music from the playlist
 */
app.delete('/deletePlaylist/:playlistID/music/:musicID', checkToken, (req, res) => {
    const playlistMusic = { playlistID: req.params.playlistID, musicID: req.params.musicID };

    deletePlaylistMusic(playlistMusic).then((results) => {
        if (results.affectedRows) {
            console.log('Music successfully deleted from playlist');
            return res.status(200).send('Music successfully deleted from playlist');
        }
        console.log('The music or the playlist does not exist');
        res.status(200).send('The music or the playlist does not exist');
    }).catch((err) => {
        console.log('Error :' + err);
        res.status(400).send('Error while deleting music from playlist');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
