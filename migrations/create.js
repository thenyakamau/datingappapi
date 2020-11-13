const database = require("../config/database");

function createUser() {
  let sql =
    "CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT, unique_id VARCHAR(255) UNIQUE, name VARCHAR(255), dob VARCHAR(255), gender VARCHAR(255), phone VARCHAR(255) UNIQUE, profession VARCHAR(255), lat VARCHAR(255), lon VARCHAR(255), county VARCHAR(255),height VARCHAR(255), character_type VARCHAR(255), relation VARCHAR(255), image VARCHAR(255), created_at DATETIME  DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id))";
  database.query(sql, (error, result) => {
    if (error) throw error;
    return console.log(result);
  });
}

createUser();
