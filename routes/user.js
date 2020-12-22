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
    findAllUsers,
    updateFcmToken
} = require("../controllers/user");

//token guards
const passportJWT = passport.authenticate("jwt", {
    session: false
});

router.route("/login").post(authenticateUser);


//authenticated User
router.route("/confirmCode").post(passportJWT, confirmOtpCode);
router.route("/logout").post(passportJWT, logOut)
router.route("/get").get(passportJWT, findAllUsers);
router
    .route("/")
    .get(passportJWT, fetchProfile)
    .put(passportJWT, updateFcmToken)
    .post(passportJWT, updateAccount)
    .delete(passportJWT, deleteAccount);

module.exports = router;