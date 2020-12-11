const User = require("../models/user");
const Conversation = require("../models/conversation")
const Message = require("../models/message")

User.drop()
    .then((res) => {
        console.log("User table dropped");
    })
    .catch((error) => {
        console.error("Something went wrong", error);
    });

Conversation.drop()
    .then((res) => {
        console.log("User table dropped");
    })
    .catch((error) => {
        console.error("Something went wrong", error);
    });

Message.drop()
    .then((res) => {
        console.log("User table dropped");
    })
    .catch((error) => {
        console.error("Something went wrong", error);
    });