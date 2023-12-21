const mysql = require('mysql');

require('dotenv').config({ path: 'credentials.env' });
const databaseUser = process.env.DATABASE_USER;
const datanasePassword = process.env.DATABASE_PASSWORD;

const connection = mysql.createConnection({
  host: 'localhost',
  user: databaseUser,
  password: datanasePassword,
  database: 'sukify'
});

/**
 * Connect the database
 */
const connectDatabase = () => {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });
};

/**
 * Insert a new music
 */
const insertMusic = ({ musicID, musicTitle, musicDuration }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO Music (musicID, musicTitle, musicDuration) VALUES (?, ?, ?)';
    const values = [musicID, musicTitle, musicDuration];

    connection.query(query, values, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results); 
    });
  });
};

/**
 * Insert a new playlist
 */
const insertPlaylist = (playlistName) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Playlist (name) VALUES (${playlistName})`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

/**
 * Update a specific playlist
 */
const updatePlaylist = ({ playlistID, newName }) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Playlist SET name = ${newName} WHERE id = ${playlistID}`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

/**
 * Delete a specific playlist
 */
const deletePlaylist = (playlistID) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM Playlist WHERE id = ${playlistID}`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

/**
 * Delete specific music
 */
const deleteMusic = (musicID) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM Music WHERE id = ${musicID}`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

/**
 * Update a specific music
 */
const updateMusic = ({ musicID, musicTitle }) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Music SET musicTitle = ${musicTitle} WHERE id = ${musicID}`;
    
    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    }); 
  });
};

/**
 * Insert a new link between a music and a playlist
 */
const insertPlaylistMusic = ({ playlistID, musicID }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO Playlistmusics (playlistID, musicID) VALUES (?, ?)';
    const values = [ playlistID, musicID ];

    connection.query(query, values, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

/**
 * Get musics depending on the offset and the limit
 */
const getMusics = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Music LIMIT ${limit} OFFSET ${offset}`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

/**
 * Get playlists depending on the offset and the limit
 */
const getPlaylists = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    const query =  `SELECT * FROM Playlist LIMIT ${limit} OFFSET ${offset}`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

/**
 * Get the playlist musics
 */
const getPlayistMusics = ({ playlistID, limit, offset }) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Playlistmusics WHERE playlistID = ${playlistID} LIMIT ${limit} OFFSET ${offset}`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

/**
 * End the connection
 */
const endDatabase = () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
      return;
    }
    console.log('Database connection closed');
  });
};

module.exports = {connectDatabase, endDatabase, insertMusic, insertPlaylist, updatePlaylist, deletePlaylist, deleteMusic, updateMusic, insertPlaylistMusic, getMusics, getPlaylists, getPlayistMusics};
