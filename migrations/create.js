const User = require("../models/user");
const OtpToken = require("../models/otp_tokens");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const Matches = require("../models/matches");

//used aync functions since migrations needs to be in order
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function migration() {
  User.sync({ force: true })
    .then((res) => {
      console.log("The table for the User model was just (re)created!");
    })
    .catch((error) => {
      console.error("There was an error", error);
    });

  await sleep(500);

  OtpToken.sync({ force: true })
    .then((res) => {
      console.log("The table for the otp token model was just (re)created!");
    })
    .catch((error) => {
      console.error("There was an error", error);
    });

  await sleep(500);

  Conversation.sync({ force: true })
    .then((res) => {
      console.log("The table for the conversation model was just (re)created!");
    })
    .catch((error) => {
      console.error("There was an error", error);
    });

  await sleep(500);
  Message.sync({ force: true })
    .then((res) => {
      console.log("The table for the message model was just (re)created!");
    })
    .catch((error) => {
      console.error("There was an error", error);
    });
  await sleep(500);
  Matches.sync({ force: true })
    .then((res) => {
      console.log("The table for the matches model was just (re)created!");
    })
    .catch((error) => {
      console.error("There was an error", error);
    });
}

migration();
