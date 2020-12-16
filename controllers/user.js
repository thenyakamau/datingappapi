const generateJwtToken = require("../config/jwt");
const { randomString, randomOtp } = require("../utils/RandomString");
const sendMessage = require("../config/sendOtp");
const saveImage = require("../config/SaveImage");
const User = require("../models/user");
const OtpToken = require("../models/otp_tokens");
const { Op } = require("sequelize");

function authenticateUser(req, res, next) {
    const { phone } = req.body;

    User.findOne({
            where: {
                phone: phone,
            },
        })
        .then((user) => {
            if (user != null) {
                sendOtpCode(user, phone, res);
            } else {
                User.create({ phone: phone })
                    .then((user) => {
                        sendOtpCode(user, phone, res);
                    })
                    .catch((error) => {
                        console.error("There is an error", error);
                        const messages = "Something went wrong";
                        return res.status(500).json({
                            success: false,
                            error: messages,
                        });
                    });
            }
        })
        .catch((error) => {
            const messages = "Something went wrong";
            return res.status(500).json({
                success: false,
                error: messages,
            });
        });
}

exports.authenticateUser = authenticateUser;

function confirmOtpCode(req, res, next) {
    const { otpCode } = req.body;
    let currentTime = new Date().getTime();
    let date = new Date(currentTime).toISOString().slice(0, 19).replace("T", " ");
    OtpToken.findOne({
            where: {
                otp: otpCode,
                expires: {
                    [Op.gte]: date,
                },
                used: 0,
                userId: req.user.id,
            },
        })
        .then((otp) => {
            OtpToken.update({ used: 1 }, {
                    where: {
                        id: otp.id,
                    },
                })
                .then((otp2) => {
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
                })
                .catch((error) => {
                    const messages = "Something went wrong";
                    return res.status(500).json({
                        success: false,
                        error: messages,
                    });
                });
        })
        .catch((error) => {
            const messages = "Something went wrong";
            return res.status(500).json({
                success: false,
                error: messages,
            });
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

    const userBody = {...user, image: imageFile };

    User.update(userBody, {
            where: {
                id: user_id,
            },
        })
        .then((user) => {
            return res.status(200).json({
                success: true,
                data: req.user,
            });
        })
        .catch((error) => {
            const messages = "Something went wrong";
            return res.status(500).json({
                success: false,
                error: messages,
            });
        });
}

exports.updateAccount = updateAccount;

function logOut(req, res, next) {}

exports.logOut = logOut;

function deleteAccount(req, res, next) {}

exports.deleteAccount = deleteAccount;

function sendOtpCode(user, phone, res) {
    const otpCode = randomOtp();
    const response = {
        user: user,
        token: generateJwtToken(user),
    };
    let expirationDate = new Date().setDate(new Date().getDate() + 1);
    let date = new Date(expirationDate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    OtpToken.create({ otp: otpCode, userId: user.id, expires: date })
        .then((otp) => {
            sendMessage(
                phone,
                `Otp confirmation code: ${otpCode} , Expires after 24 hours`
            );
            if (user.name == null) {
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
        })
        .catch((error) => {
            console.log("This is the error", error);
            const messages = "Something went wrong";
            return res.status(500).json({
                success: false,
                error: messages,
            });
        });
}