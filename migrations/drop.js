const database = require("../config/database");

function dropOtp() {
  let sql = "DROP TABLE IF EXISTS otp_tokens";
  database.query(sql, (error, result) => {
    if (error) throw error;
    return result;
  });
}

dropOtp();

function dropUsers() {
  let sql = "DROP TABLE IF EXISTS users";
  database.query(sql, (error, result) => {
    if (error) throw error;
    return result;
  });
}

dropUsers();
