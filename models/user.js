const database = require("../config/database");
const Sequelize = require("sequelize");
const OtpToken = require("./otp_tokens");
const Message = require("./message")
const Conversation = require("./conversation")

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
        type: Sequelize.INTEGER,
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
        type: Sequelize.STRING,
    },
    character_type: {
        type: Sequelize.INTEGER,
    },
    relation: {
        type: Sequelize.INTEGER,
    },
    image: {
        type: Sequelize.STRING,
    },
});

User.hasOne(OtpToken);

OtpToken.belongsTo(User, {
    onDelete: "CASCADE",
    foreignKey: {
        allowNull: false,
    },
});

User.hasOne(Message)

Message.belongsTo(User, {
    onDelete: "CASCADE",
    foreignKey: {
        allowNull: false,
    },
});

User.hasOne(Conversation)

Conversation.belongsTo(User, )
Conversation.belongsTo(User, { as: "secondUser" })

module.exports = User;