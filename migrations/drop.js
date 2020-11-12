const database = require("../config/database");

function dropUsers() {
  let sql = "DROP TABLE IF EXISTS users";
  database.query(sql, (error, result) => {
    if (error) throw error;
    return console.log(result);
  });
}

dropUsers();
