const database = require("../config/database");
const Sequelize = require("sequelize");

const Message = database.define("messages", {
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    read: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
})

module.exports = Message