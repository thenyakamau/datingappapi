const generateJwtToken = require("../config/jwt");
const {
  fetchUser,
  createUserViaPhone,
  fetchUserByUuid,
  updateUserOtp,
  checkOtp,
} = require("../models/user");
const { randomString, randomOtp } = require("../utils/RandomString");
const sendMessage = require("../config/sendOtp");

function authenticateUser(req, res, next) {
  const otpCode = randomOtp();
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
      updateUserOtp(otpCode, result[0].id, (err, record) => {
        if (err) {
          const messages = "Something went wrong";
          return res.status(500).json({
            success: false,
            error: messages,
          });
        }
        sendMessage(req.body.phone, `Otp confirmation code: ${otpCode}`);
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
      });
    } else {
      const uuid = randomString(10);
      fetchUserByUuid(uuid, (error, result) => {
        if (error) {
          const messages = "Something went wrong";
          return res.status(500).json({
            success: false,
            error: messages,
          });
        }
        if (result != null && result.length > 0) {
          uuid = randomString(10);
        }

        createUserViaPhone(req.body.phone, uuid, otpCode, (error, result) => {
          if (error) {
            console.log(error);
            const messages = "Something went wrong";
            return res.status(500).json({
              success: false,
              error: messages,
            });
          }
          sendMessage(req.body.phone, `Otp confirmation code: ${otpCode}`);

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

function confirmOtpCode(req, res, next) {
  checkOtp(req.body.otp, req.user.id, (error, result) => {
    if (error) {
      const messages = "Something went wrong";
      return res.status(500).json({
        success: false,
        error: messages,
      });
    }

    if (result != null && result.length > 0) {
      if (result[0].name == null) {
        return res.status(201).json({
          success: true,
          data: result[0],
        });
      } else {
        return res.status(200).json({
          success: true,
          data: result[0],
        });
      }
    } else {
      return res.status(401).json({
        success: true,
        data: { message: "Otp message not confirmed" },
      });
    }
  });
}

exports.confirmOtpCode = confirmOtpCode;

function fetchProfile(req, res, next) {
  const user = req.user;
  return res.status(200).json({
    success: true,
    data: user,
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
