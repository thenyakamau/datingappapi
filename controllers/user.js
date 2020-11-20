const generateJwtToken = require("../config/jwt");
const {
  fetchUser,
  createUserViaPhone,
  fetchUserByUuid,
  createUserOtp,
  checkOtp,
  updateOtpStatus,
  updateProfile,
} = require("../models/user");
const { randomString, randomOtp } = require("../utils/RandomString");
const sendMessage = require("../config/sendOtp");
const saveImage = require("../config/SaveImage");

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
      createUserOtp(otpCode, result[0].id, (err, record) => {
        if (err) {
          const messages = "Something went wrong with otp code";
          return res.status(500).json({
            success: false,
            error: messages,
          });
        }
        sendMessage(
          req.body.phone,
          `Otp confirmation code: ${otpCode} , Expires after 24 hours`
        );
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

        createUserViaPhone(req.body.phone, uuid, (error, result) => {
          if (error) {
            console.log(error);
            const messages = "Something went wrong";
            return res.status(500).json({
              success: false,
              error: messages,
            });
          }
          createUserOtp(otpCode, result[0].id, (err, record) => {
            if (err) {
              const messages = "Something went wrong";
              return res.status(500).json({
                success: false,
                error: messages,
              });
            }
            sendMessage(
              req.body.phone,
              `Otp confirmation code: ${otpCode} , Expires after 24 hours`
            );
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
      updateOtpStatus(req.body.otp, req.user.id, (err, record) => {
        if (err) {
          const messages = "Something went wrong";
          return res.status(500).json({
            success: false,
            error: messages,
          });
        }
        if (req.user.name == null) {
          return res.status(201).json({
            success: true,
            data: req.user,
          });
        } else {
          return res.status(200).json({
            success: true,
            data: req.user,
          });
        }
      });
    } else {
      return res.status(401).json({
        success: false,
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

async function updateAccount(req, res, next) {
  const user = req.body;
  const user_id = req.user.id;
  let imageFile;
  if (req.files !== null) {
    const { image } = req.files;
    const file_name = randomString(9) + user_id;
    const file_path = `uploads/profile/${file_name + image.name}`;
    const upload = await saveImage(image, file_path);
    if (!upload) {
      imageFile = null;
    } else {
      imageFile = file_path;
    }
  }

  updateProfile(user, user_id, imageFile, (error, result) => {
    if (error) {
      const messages = "Something went wrong";
      return res.status(500).json({
        success: false,
        error: messages,
      });
    }
    if (result != null && result.length > 0) {
      return res.status(200).json({
        success: true,
        data: result[0],
      });
    } else {
      return res.status(401).json({
        success: false,
        data: { message: "Could not updated profile" },
      });
    }
  });
}

exports.updateAccount = updateAccount;

function logOut(req, res, next) {}

exports.logOut = logOut;

function deleteAccount(req, res, next) {}

exports.deleteAccount = deleteAccount;
