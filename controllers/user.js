const generateJwtToken = require("../config/jwt");
const {
  fetchUser,
  createUserViaPhone,
  fetchUserByUuid,
} = require("../models/user");

const randomString = require("../utils/RandomString");

function authenticateUser(req, res, next) {
  fetchUser(req.body.phone, (error, result) => {
    if (error) {
      const messages = "Something went wrong";
      return res.status(500).json({
        success: false,
        error: messages,
      });
    }
    if (result != null && result.length > 0) {
      const response = {
        user: result[0],
        token: generateJwtToken(result[0]),
      };
      if (result[0].name == null) {
        return res.status(201).json({
          success: true,
          data: response,
        });
      } else {
        return res.status(200).json({
          success: true,
          data: response,
        });
      }
    } else {
      const uuid = randomString(10);
      fetchUserByUuid(uuid, (error, result) => {
        if (error) {
          console.log(error);
          const messages = "Something went wrong";
          return res.status(500).json({
            success: false,
            error: messages,
          });
        }
        if (result != null && result.length > 0) {
          uuid = randomString(10);
        }
        createUserViaPhone(req.body.phone, uuid, (error, result) => {
          if (error) {
            console.log(error);
            const messages = "Something went wrong";
            return res.status(500).json({
              success: false,
              error: messages,
            });
          }
          const response = {
            user: result[0],
            token: generateJwtToken(result[0]),
          };
          return res.status(201).json({
            success: true,
            data: response,
          });
        });
      });
    }
  });
}

exports.authenticateUser = authenticateUser;

function fetchProfile(req, res, next) {
  return res.status(200).json({
    success: true,
    data: "result",
  });
}

exports.fetchProfile = fetchProfile;

function updateAccount(req, res, next) {
  return res.status(200).json({
    success: true,
    data: "called",
  });
}

exports.updateAccount = updateAccount;

function logOut(req, res, next) {}

exports.logOut = logOut;

function deleteAccount(req, res, next) {}

exports.deleteAccount = deleteAccount;
