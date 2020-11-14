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

function createUserViaPhone(phone, uuid, otp, callback) {
  let sql = `INSERT INTO users set unique_id = '${uuid}', phone = ${phone}, otp = ${otp}`;
  database.query(sql);
  return fetchUser(phone, callback);
}

exports.createUserViaPhone = createUserViaPhone;

function updateUserOtp(otp, user_id, callback) {
  let sql = `UPDATE users set otp = ${otp} WHERE id = ${user_id}`;
  database.query(sql, callback);
}

exports.updateUserOtp = updateUserOtp;

function checkOtp(otp, user_id, callback) {
  let sql = `SELECT * FROM users WHERE otp = ${otp} AND id = ${user_id}`;
  return database.query(sql, callback);
}

exports.checkOtp = checkOtp;

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
    "UPDATE users set name = ?, dob = ?, gender = ?, profession = ?, lat = ?, lon = ?, county = ?, height = ?, character_type = ?, relation = ?,  WHERE phone = ?";

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
