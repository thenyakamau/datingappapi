const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  driver: process.env.DB_CONNECTION,
  multipleStatements: true,
});

db.connect((error) => {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log(`Mysql database is running on ${process.env.DB_HOST}`.green);
});

module.exports = db;
