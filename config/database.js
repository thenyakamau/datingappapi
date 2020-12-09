const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   driver: process.env.DB_CONNECTION,
//   multipleStatements: true,
// });

// db.connect((error) => {
//   if (error) {
//     console.log(error);
//     throw error;
//   }
//   console.log(`Mysql database is running on ${process.env.DB_HOST}`.green);
// });

const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
  }
);

db.authenticate()
  .then((res) => {
    console.log(`Mysql database is running on ${process.env.DB_HOST}`.green);
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = db;
