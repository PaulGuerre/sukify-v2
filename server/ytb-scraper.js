const { exec } = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const ffprobePath = require('ffprobe-static').path;
const { google } = require('googleapis');

ffmpeg.setFfprobePath(ffprobePath);
require('dotenv').config({ path: process.env.ENV_FILE === 'docker' ? '.env.docker' : '.env.local' });
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const musicsFolder = process.env.MUSICS_FOLDER;

const youtube = google.youtube({
  version: 'v3',
  auth: youtubeApiKey,
});

/**
 * Use google API to find the url of a music thanks to a provided name
 * @param {String} videoName 
 * @returns 
 */
const searchVideoByName = (videoName) => {
  return new Promise((resolve, reject) => {
    youtube.search.list(
      {
        part: 'snippet',
        q: videoName,
        type: 'video',
        maxResults: 1,
        videoDuration: 'medium'
      },
      (err, response) => {
        if (err) {
          console.error('Error searching for the video:', err);
          reject(err);
        } else {
          if (response.data.items.length > 0) {
            const videoID = response.data.items[0].id.videoId;
            const videoTitle = response.data.items[0].snippet.title;
            resolve({ videoID, videoTitle });
          } else {
            reject(new Error('No video found with that name'));
          }
        }
      }
    );
  });
};

/**
 * Download a youtube video thanks to the url provided
 * @param {String} videoURL 
 * @returns 
 */
const downloadMP3 = (videoID) => {
  const downloadOptions = {
    output: `${musicsFolder}/%(id)s.mp3`,
    format: 'bestaudio/best',
    audioFormat: 'mp3',
  };

  return exec(`https://www.youtube.com/watch?v=${videoID}`, downloadOptions);
};

/**
 * Get the duration of the music
 * @param {String} videoID 
 */
const getMusicDuration = (videoID) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(`${musicsFolder}/${videoID}.mp3`, (err, metadata) => {
      if (err) {
        console.error('Error:', err);
        reject(err);
        return;
      }
      const duration = metadata.format.duration;
      resolve(duration);
    });
  });
};

module.exports = {downloadMP3, searchVideoByName, getMusicDuration};
