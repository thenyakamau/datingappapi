const User = require("../models/user");
const Conversation = require("../models/conversation")
const Message = require("../models/message")
const OtpToken = require("../models/otp_tokens");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function drop() {

    Message.drop()
        .then((res) => {
            console.log("Message table dropped");
        })
        .catch((error) => {
            console.error("Something went wrong", error);
        });

    await sleep(100);

    Conversation.drop()
        .then((res) => {
            console.log("Conversation table dropped");
        })
        .catch((error) => {
            console.error("Something went wrong", error);
        });

    await sleep(100);

    OtpToken.drop()
        .then((res) => {
            console.log("Otp table dropped");
        })
        .catch((error) => {
            console.error("Something went wrong", error);
        });
    await sleep(100);

    User.drop()
        .then((res) => {
            console.log("User table dropped");
        })
        .catch((error) => {
            console.error("Something went wrong", error);
        });

    await sleep(100);

}

drop()