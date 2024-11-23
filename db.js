const mysql = require('mysql2');

// Create a connection
// we can also use .env but since it is in git ignore I have to remove it  and directly add
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'agapa3039r',
    database: 'db3'
});
conn.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
      process.exit(1);  // Exit the process if the connection fails
    }
    console.log('Connected to the MySQL database');
  });
  


module.exports = conn.promise();
