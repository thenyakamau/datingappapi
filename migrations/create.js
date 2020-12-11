const User = require("../models/user");
const OtpToken = require("../models/otp_tokens");
const Conversation = require("../models/conversation")
const Message = require("../models/message")

User.sync({ force: true })
    .then((res) => {
        console.log("The table for the User model was just (re)created!");
    }, )
    .catch((error) => {
        console.error("There was an error", error);
    }, );

OtpToken.sync({ force: true })
    .then((res) => {
        console.log("The table for the otp token model was just (re)created!");
    }, )
    .catch((error) => {
        console.error("There was an error", error);
    }, );
Message.sync({ force: true })
    .then((res) => {
        console.log("The table for the message model was just (re)created!");
    }, )
    .catch((error) => {
        console.error("There was an error", error);
    }, );
Conversation.sync({ force: true })
    .then((res) => {
        console.log("The table for the conversation model was just (re)created!");
    }, )
    .catch((error) => {
        console.error("There was an error", error);
    }, );