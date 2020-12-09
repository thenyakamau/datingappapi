const database = require("../config/database");
const Sequelize = require("sequelize");
const OtpToken = require("./otp_tokens");

// function fetchUser(phone, callback) {
//   let sql = `SELECT * FROM users WHERE phone = ${phone}`;
//   return database.query(sql, callback);
// }
// exports.fetchUser = fetchUser;

// function fetchUserByUuid(uuid, callback) {
//   let sql = `SELECT * FROM users WHERE unique_id = '${uuid}'`;
//   return database.query(sql, callback);
// }

// exports.fetchUserByUuid = fetchUserByUuid;

// function createUserViaPhone(phone, uuid, callback) {
//   let sql = `INSERT INTO users set unique_id = '${uuid}', phone = ${phone}`;
//   database.query(sql);
//   return fetchUser(phone, callback);
// }

// exports.createUserViaPhone = createUserViaPhone;

// function createUserOtp(otp, user_id, callback) {
//   let expirationDate = new Date().setDate(new Date().getDate() + 1);
//   let date = new Date(expirationDate)
//     .toISOString()
//     .slice(0, 19)
//     .replace("T", " ");
//   let sql = `INSERT INTO otp_tokens set otp = '${otp}', user_id = ${user_id}, expires = '${date}'`;
//   return database.query(sql, callback);
// }

// exports.createUserOtp = createUserOtp;

// function checkOtp(otp, user_id, callback) {
//   let currentTime = new Date().getTime();
//   let date = new Date(currentTime).toISOString().slice(0, 19).replace("T", " ");
//   let checkSql = `SELECT * FROM otp_tokens WHERE otp = ${otp} AND user_id = ${user_id} AND used = ${0} AND expires >= '${date}'`;
//   return database.query(checkSql, callback);
// }

// exports.checkOtp = checkOtp;

// function updateOtpStatus(otp, user_id, callback) {
//   let sql = `UPDATE otp_tokens set used = ${1} WHERE otp = ${otp} AND user_id = ${user_id}`;
//   database.query(sql, callback);
// }

// exports.updateOtpStatus = updateOtpStatus;

// function updateProfile(user, user_id, imageFile, callback) {
//   if (imageFile == null) {
//     const {
//       name,
//       dob,
//       gender,
//       profession,
//       lat,
//       lon,
//       county,
//       height,
//       character_type,
//       relation,
//     } = user;
//     let sql = `UPDATE users set name = '${name}', dob = '${dob}', gender = ${gender}, profession = '${profession}', lat = ${lat}, lon = ${lon}, county = '${county}', height = ${height}, character_type = ${character_type}, relation = ${relation}  WHERE id = ${user_id}`;

//     database.query(sql);
//   } else {
//     const {
//       name,
//       dob,
//       gender,
//       profession,
//       lat,
//       lon,
//       county,
//       height,
//       character_type,
//       relation,
//     } = user;
//     let sql = `UPDATE users set name = '${name}', dob = '${dob}', gender = ${gender}, profession = '${profession}', lat = ${lat}, lon = ${lon}, county = '${county}', height = ${height}, character_type = ${character_type}, relation = ${relation}, image = '${imageFile}'  WHERE id = ${user_id}`;

//     database.query(sql);
//   }
//   return fetchUserById(user_id, callback);
// }

// exports.updateProfile = updateProfile;

// function fetchUserById(user_id, callback) {
//   let sql = `SELECT * FROM users WHERE id = '${user_id}'`;
//   return database.query(sql, callback);
// }

const User = database.define("users", {
  unique_id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
  },
  dob: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  profession: {
    type: Sequelize.STRING,
  },
  lat: {
    type: Sequelize.STRING,
  },
  lon: {
    type: Sequelize.STRING,
  },
  county: {
    type: Sequelize.STRING,
  },
  height: {
    type: Sequelize.INTEGER,
  },
  character_type: {
    type: Sequelize.STRING,
  },
  relation: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
});

User.hasOne(OtpToken);

OtpToken.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = User;
