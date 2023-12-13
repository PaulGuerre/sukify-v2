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

const connectDatabase = () => {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });
};

const printMusics = () => {
  connection.query('SELECT * FROM Musics', (err, results, fields) => {
    if (err) {
      console.error('Error retrieving data:', err);
      return;
    }

    console.log('All records in the Musics table:');
    console.table(results);
  });
};

const insertMusic = ({ musicID, musicTitle, musicDuration }) => {
  const query = 'INSERT INTO Musics (musicID, musicTitle, musicDuration) VALUES (?, ?, ?)';
  const values = [musicID, musicTitle, musicDuration];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.log('Error inserting data:', err);
      return;
    }

    console.log('Data inserted');
    printMusics();
  })
};

const endDatabase = () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
      return;
    }
    console.log('Database connection closed');
  });
};

module.exports = {connectDatabase, endDatabase, insertMusic, printMusics};
