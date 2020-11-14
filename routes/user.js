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

const passportJWT = passport.authenticate("jwt", { session: false });

router
  .route("/")
  .get(passportJWT, fetchProfile)
  .post(passportJWT, updateAccount)
  .delete(passportJWT, deleteAccount);
router.route("/login").post(authenticateUser);
router.route("/confrimCode").post(passportJWT, confirmOtpCode);

module.exports = router;
