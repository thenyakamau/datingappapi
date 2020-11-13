const express = require("express");
const router = express.Router();
const {
  fetchProfile,
  updateAccount,
  deleteAccount,
  logOut,
  authenticateUser,
} = require("../controllers/user");

// router.get
router.route("/").get(fetchProfile).post(updateAccount).delete(deleteAccount);
router.route("/login").post(authenticateUser);

module.exports = router;
