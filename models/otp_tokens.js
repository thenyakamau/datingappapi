const database = require("../config/database");
const Sequelize = require("sequelize");

var OtpToken = database.define("otp_tokens", {
  otp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  used: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  expires: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
module.exports = OtpToken;
