const User = require("../models/user");

User.drop()
  .then((res) => {
    console.log("User table dropped");
  })
  .catch((error) => {
    console.error("Something went wrong", error);
  });
