const mysql = require('mysql');

const connect = () => {
    const pool = mysql.createPool ({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    });
    global.db = pool;
}; 

/* const connect = () => {
    const pool = mysql.createPool ({
        host: "eu-cdbr-west-03.cleardb.net",
        user: "bcb87d02439c65",
        password: "01a2a8c4",
        database: "heroku_2d81ea69f11382b"
    });
    global.db = pool;
}; */

module.exports = {
   connect          
}