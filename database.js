// Set the environment variables defined in the .env file by requirin the dotenv package and run config()
require("dotenv").config();

// Import mysql2
const mysql = require("mysql2/promise");

// Use mysql.createPool to prepare a connection pool using the environment variables you created
const database = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Check if the connection is ok
database
    .getConnection()
    .then(() => {
        console.log("Can reach database");
    })
    .catch((err) => {
        console.error(err);
});

// Send requests to the MySQL server
database
    .query("select * from movies")
    .then(([movies]) => {
    console.log(movies);
    })
    .catch((err) => {
    console.error(err);
});

database
  .query("select * from users")
  .then(([users]) => {
    console.log(users);
  })
  .catch((err) => {
    console.error(err);
});

module.exports = database;
