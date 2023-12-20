const express = require('express');
const cors = require('cors');
const multer = require('multer');

const { downloadMP3, searchVideoByName, getMusicDuration } = require('./ytb-scraper');
const { connectDatabase, insertMusic, insertPlaylist, updatePlaylist, deletePlaylist, deleteMusic, updateMusic } = require('./databaseManager');

require('dotenv').config({ path: 'credentials.env' });
const thumbnailFolder = process.env.THUMBNAILS_FOLDER;

const app = express();
const port = 7000;

connectDatabase();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, thumbnailFolder);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});
  
const upload = multer({ storage: storage });

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
                    return res.status(200).send('Video downloaded as MP3 successfully');
                }).catch((err) => {
                    console.log('Error: ' + err);
                    return res.status(500).send('Video already downloaded');
                });
            });
        }).catch((err) => {
            console.log('Error: ' + err);
            return res.status(500).send('Error while downloading the music');
        });
    }).catch((err) => {
        console.log('Error: ' + err);
        return res.status(500).send('Error while searching the music');
    });
});

/**
 * Create a playlist
 */
app.post('/createPlaylist', upload.single('thumbnail'), (req, res) => {
    const playlist = { playlistName: req.query.playlistName, thumbnail: req.file?.originalname };

    if (!playlist.playlistName || !playlist.thumbnail) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    insertPlaylist(playlist).then(() => {
        console.log('Playlist successfully created');
        return res.status(200).send("Playlist successfully creayed");
    }).catch((err) => {
        console.log('Error: ' + err);
        return res.status(500).send('Error while creating playlist');
    });
});

/**
 * Update either the name or the thumbnail of the playlist, or both
 */
app.put('/updatePlaylist/:playlistID', upload.single('thumbnail'), (req, res) => {
    const newPlaylist = { playlistID: req.params.playlistID, newName: req.query.newName, newThumbnail: req.file?.originalname };

    if (!newPlaylist.playlistID || (!newPlaylist.newName && !newPlaylist.newThumbnail)) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    updatePlaylist(newPlaylist).then((results) => {
        if (results.affectedRows) {
            console.log('Playlist updated successfully');
            return res.status(200).send('Playlist updated successfully');
        }
        console.log('The playlist does not exist');
        return res.status(200).send('The playlist does not exist');
    }).catch((err) => {
        console.log('Error:' + err);
        return res.status(500).send('Error while updating playlist');
    });
});

/**
 * Delete a playlist
 */
app.delete('/deletePlaylist/:playlistID', (req, res) => {
    const playlistID = req.params.playlistID;

    if (!playlistID) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    deletePlaylist(playlistID).then((results) => {
        if (results.affectedRows) {
            console.log('Playlist successfully deleted');
            return res.status(200).send('Playlist successfully deleted');
        }
        console.log('The playlist does not exist');
        return res.send('The playlist does not exist');
    }).catch((err) => {
        console.log('Error :' + err);
        return res.status(500).send('Error while deleting playlist');
    });
});

/**
 * Delete a music
 */
app.delete('/deleteMusic/:musicID', (req, res) => {
    const musicID = req.params.musicID;

    if (!musicID) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    deleteMusic(musicID).then((results) => {
        if (results.affectedRows) {
            console.log('Music successfully deleted');
            return res.status(200).send('Music successfully deleted');
        }
        console.log('The music does not exist');
        return res.status(200).send('The music does not exist');
    }).catch((err) => {
        console.log('Error :' + err);
        return res.status(500).send('Error while deleting music');
    });
});

/**
 * Update a music
 */
app.put('/updateMusic/:musicID', (req, res) => {
    const music = { musicID: req.params.musicID, musicTitle: req.query.newName };

    if (!music.musicID || !music.musicTitle) {
        console.log('Error : missing parameters');
        return res.status(500).send('Missing parameters');
    }

    updateMusic(music).then((results) => {
        if (results.affectedRows) {
            console.log('Music updated successfully');
            return res.status(200).send('Music updated successfully');
        }
        console.log('The music does not exist');
        return res.status(500).send('The music does not exist');
    }).catch((err) => {
        console.log('Error : ' + err);
        return res.status(500).send('Error while updating music');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
