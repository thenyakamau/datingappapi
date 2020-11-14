const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

// Set your app credentials
const credentials = {
  apiKey: process.env.SMS_API,
  username: process.env.SMS_USERNAME,
};

// Initialize the SDK
const AfricasTalking = require("africastalking")(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

function sendMessage(phone, message) {
  const options = {
    // Set the numbers you want to send to in international format
    to: phone,
    // Set your message
    message: message,
    // Set your shortCode or senderId
    // from: "XXYYZZ",
  };

  // That’s it, hit send and we’ll take care of the rest
  sms
    .send(options)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

module.exports = sendMessage;
