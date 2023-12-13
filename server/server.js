const express = require('express');
const cors = require('cors');

const { downloadMP3, searchVideoByName, getMusicDuration } = require('./ytb-scraper');
const { connectDatabase, insertMusic, printMusics } = require('./databaseManager');

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

    searchVideoByName(videoName).then(({ videoID, videoTitle }) => {
        const music = { musicID: videoID, musicTitle: videoTitle };

        // TODO : check if the videoID is not already in the database

        downloadMP3(videoID).then(() => {
            getMusicDuration(videoID).then((duration) => {
                music.musicDuration = duration;
                insertMusic(music);
                console.log('Video downloaded as MP3 successfully!');
                res.status(200).send('Video downloaded as MP3 successfully!');
            });
        }).catch((err) => {
            console.log('Error: ' + err);
            res.status(500).send('Error: ' + err);
        })
    }).catch((err) => {
        console.log('Error: ' + err);
        res.status(500).send('Error');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
