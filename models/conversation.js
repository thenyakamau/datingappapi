const database = require("../config/database");
const Sequelize = require("sequelize");
const Message = require("./message")

const Conversation = database.define("conversation", {
    // userId: {
    //     type: Sequelize.BIGINT.UNSIGNED,
    //     allowNull: false,
    // },
    // secondUserId: {
    //     type: Sequelize.BIGINT.UNSIGNED,
    //     allowNull: false,
    // },

})

Conversation.hasMany(Message)

Message.belongsTo(Conversation, {
    onDelete: "CASCADE",
    foreignKey: {
        allowNull: false,
    },
})


module.exports = Conversation