const database = require("../config/database");

function loginUser(callback) {
  let sql = `SELECT * FROM books WHERE isbn = ${isbn}`;
  return database.query(sql, callback);
}
