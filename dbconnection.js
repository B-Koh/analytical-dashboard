const mysql           = require('mysql2');


// Create a connection to the MySQL database
const connection = mysql.createConnection({
    port: '/var/run/mysqld/mysqld.sock',
    host: '157.230.221.51',
    user: 'jared',
    password: 'jtvillan',
    database: 'UserData'
  });

//Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;