const database = require("../config/database");

function fetchUser(phone, callback) {
  let sql = `SELECT * FROM users WHERE phone = ${phone}`;
  return database.query(sql, callback);
}
exports.fetchUser = fetchUser;

function fetchUserByUuid(uuid, callback) {
  let sql = `SELECT * FROM users WHERE unique_id = '${uuid}'`;
  return database.query(sql, callback);
}

exports.fetchUserByUuid = fetchUserByUuid;

function createUserViaPhone(phone, uuid, callback) {
  let sql = `INSERT INTO users set unique_id = '${uuid}', phone = ${phone}`;
  database.query(sql);
  return fetchUser(phone, callback);
}

exports.createUserViaPhone = createUserViaPhone;

function updateProfile(user, callback) {
  const {
    name,
    dob,
    gender,
    phone,
    profession,
    lat,
    lon,
    county,
    height,
    character_type,
    relation,
  } = user;
  let sql =
    "UPDATE books set name = ?, dob = ?, gender = ?, profession = ?, lat = ?, lon = ?, county = ?, height = ?, character_type = ?, relation = ?,   WHERE phone = ?";

  database.query(
    sql,
    [
      name,
      dob,
      gender,
      profession,
      lat,
      lon,
      county,
      height,
      character_type,
      relation,
      phone,
    ],
    callback
  );
}

exports.updateProfile = updateProfile;
