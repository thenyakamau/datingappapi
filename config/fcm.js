var admin = require("firebase-admin");
var serviceAccount = require("C:/Users/kim/Desktop/JOB/json/service-account-file.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://csqadmin.firebaseio.com",
});

function sendFcmToken(title, message, token) {
    //!tokens can be an array of multiple tokens
    //! This registration token comes from the client FCM SDKs.
    var registrationToken = token;

    // See the "Defining the message payload" section below for details
    // on how to define a message payload.
    var payload = {
        notification: {
            title: title,
            body: message,
        },
        // data: {
        //   score: "850",
        //   time: "2:45",
        // },
    };

    // Set the message as high priority and have it expire after 24 hours.
    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin
        .messaging()
        .sendToDevice(registrationToken, payload, options)
        .then(function(response) {
            // See the MessagingDevicesResponse reference documentation for
            // the contents of response.
            console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
}

module.exports = sendFcmToken;

function sendGroupFcmToken(title, message, nkey) {
    // See the "Managing device groups" link above on how to generate a
    // notification key.
    var notificationKey = nkey;

    // See the "Defining the message payload" section below for details
    // on how to define a message payload.
    var payload = {
        notification: {
            title: title,
            body: message,
        },
        // data: {
        //   score: "850",
        //   time: "2:45",
        // },
    };

    // Send a message to the device group corresponding to the provided
    // notification key.
    admin
        .messaging()
        .sendToDeviceGroup(notificationKey, payload)
        .then(function(response) {
            // See the MessagingDeviceGroupResponse reference documentation for
            // the contents of response.
            console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
}

exports.sendGroupFcmToken = sendGroupFcmToken;