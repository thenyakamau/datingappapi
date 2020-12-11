const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    fetchConversation,
    createConversation,
    createMessage,
    readConversation
} = require("../controllers/conversation")

const passportJWT = passport.authenticate("jwt", {
    session: false
});

router
    .route("/")
    .get(passportJWT, fetchConversation)
    .post(passportJWT, createConversation)
    .put(passportJWT, readConversation);

router.route("/message").post(passportJWT, createMessage)

module.exports = router;