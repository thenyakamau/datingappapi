const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const {
  fetchAllPotentials,
  fetchPotentialsByLocation,
  makeMatch,
  rejectMatch,
} = require("../controllers/matches");
const passportJWT = passport.authenticate("jwt", {
  session: false,
});

router
  .route("/")
  .get(passportJWT, fetchAllPotentials)
  .post(passportJWT, makeMatch);

router.route("/location").get(passportJWT, fetchPotentialsByLocation);

router.route("/reject").post(passportJWT, rejectMatch);

module.exports = router;
