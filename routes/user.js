const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const {
    fetchProfile,
    updateAccount,
    deleteAccount,
    logOut,
    authenticateUser,
    confirmOtpCode,
} = require("../controllers/user");

//token guards
const passportJWT = passport.authenticate("jwt", {
    session: false
});

router.route("/login").post(authenticateUser);

//authenticated User
router.route("/confirmCode").post(passportJWT, confirmOtpCode);
router.route("/logout").post(passportJWT, logOut)
router
    .route("/")
    .get(passportJWT, fetchProfile)
    .post(passportJWT, updateAccount)
    .delete(passportJWT, deleteAccount);

module.exports = router;