const database = require("../config/database");
const Sequelize = require("sequelize");
const OtpToken = require("./otp_tokens");

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
    onDelete: "CASCADE",
    foreignKey: {
        allowNull: false,
    },
});

// Message.belongsTo(User)

module.exports = User;