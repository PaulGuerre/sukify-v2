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
const insertPlaylist = ({ playlistName, thumbnail }) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO Playlist (name, thumbnailPath) VALUES (?, ?)';
    const values = [playlistName, thumbnail];

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
 * Update a specific playlist
 */
const updatePlaylist = ({ playlistID, newName, newThumbnail }) => {
  return new Promise((resolve, reject) => {
    let query = 'UPDATE Playlist SET';
    const values = [];

    if (newName) {
      query += ' name = ?,';
      values.push(newName);
    }

    if (newThumbnail) {
      query += ' thumbnailPath = ?,';
      values.push(newThumbnail);
    }

    query = query.slice(0, -1);
    query += ' WHERE id = ?';
    values.push(playlistID);

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
 * Delete a specific playlist
 */
const deletePlaylist = (playlistID) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Playlist WHERE id = ?';
    const values = [playlistID];

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
 * Delete specific music
 */
const deleteMusic = (musicID) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Music WHERE id = ?';
    const values = [musicID];

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
 * Update a specific music
 */
const updateMusic = ({ musicID, musicTitle }) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE Music SET musicTitle = ? WHERE id = ?';
    const values = [ musicTitle, musicID ];
    
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

module.exports = {connectDatabase, endDatabase, insertMusic, insertPlaylist, updatePlaylist, deletePlaylist, deleteMusic, updateMusic};
