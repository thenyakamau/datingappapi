const database = require("../config/database");
const Sequelize = require("sequelize");

const Matches = database.define("matches", {
  f_id: {
    type: Sequelize.INTEGER,
  },
  s_id: {
    type: Sequelize.INTEGER,
  },
  match: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  reject: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});
module.exports = Matches;
