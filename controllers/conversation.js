const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversation")
const {
    Op,
    json
} = require("sequelize");

const sendFcmToken = require("../config/fcm")

function fetchConversation(req, res, next) {

    Conversation.findAll({
        where: {
            [Op.or]: [{
                    userId: req.user.id
                },
                {
                    secondUserId: req.user.id
                }
            ]
        },
        order: [
            ["updatedAt", "DESC"],
        ],
        include: [{
            model: User,
            attributes: ['id', "name", "dob", "gender", "phone", "profession", "lat", "lon", "county", "height", "character_type", "relation", "image"]

        }, {
            model: User,
            as: "secondUser",
            attributes: ['id', "name", "dob", "gender", "phone", "profession", "lat", "lon", "county", "height", "character_type", "relation", "image"]
        }, {
            model: Message,
            order: ["createdAt", "ASC"],
            include: {
                model: User,
                attributes: ['id', "name", "dob", "gender", "phone", "profession", "lat", "lon", "county", "height", "character_type", "relation", "image"]
            },
        }]
    }).then(conversation => {
        return res.status(200).json({
            success: true,
            conversation: conversation
        })
    }).catch(err => {
        const messages = err.toString();;
        return res.status(500).json({
            success: false,
            error: messages,
        });
    })
}

exports.fetchConversation = fetchConversation

function createConversation(req, res, next) {
    const {
        id,
        message,
    } = req.body

    Conversation.create({
        userId: req.user.id,
        secondUserId: parseInt(id),
    }).then(
        conversation => {
            Message.create({
                body: message,
                read: 0,
                conversationId: conversation.id,
                userId: req.user.id,
            }).then(messages => {
                User.findOne({
                    where: {
                        id: messages.userId,
                    }
                }).then((user) => {
                    // sendFcmToken(user.name, message.body, fcm_tokens)
                    User.findOne({
                        where: {
                            id: id,
                        }
                    }).then((secondUser) => {
                        // console.log(message.toJSON())

                        sendFcmToken({
                            title: user.name,
                            message: message,
                            token: secondUser.fcm_token.toString(),
                            data: messages.toJSON().toString(),
                        })


                        return res.status(200).json({
                            success: true,
                            conversation: conversation,
                            message: message,
                            // user: secondUser
                        });
                    }).catch((err) => {
                        const messages = err.toString();
                        return res.status(500).json({
                            success: false,
                            error: messages,
                        });

                    })
                }).catch((err) => {
                    const messages = err.toString();
                    return res.status(500).json({
                        success: false,
                        error: messages,
                    });

                })
            }).catch(err => {
                const messages = err.toString();
                return res.status(500).json({
                    success: false,
                    error: messages,
                });
            })
        }
    ).catch(err => {
        const messages = err.toString();;
        return res.status(500).json({
            success: false,
            error: messages,
        });
    })
}

exports.createConversation = createConversation

function createMessage(req, res, next) {
    const {
        id,
        message,
    } = req.body

    Message.create({
        body: message,
        read: 0,
        conversationId: parseInt(id),
        userId: req.user.id,
    }).then(messages => {
        User.findOne({
            where: {
                id: messages.userId
            }
        }).then(user => {
            Conversation.findOne({
                where: {
                    id: id,
                },
            }).then(conversation => {
                User.findOne({
                    where: {
                        id: conversation.userId == req.user.id ? conversation.secondUserId : conversation.userId
                    }
                }).then(secondUser => {
                    sendFcmToken({
                        title: user.name,
                        message: message,
                        token: secondUser.fcm_token.toString(),
                        data: messages.toJSON().toString(),
                    })

                    return res.status(200).json({
                        success: true,
                        message: messages,
                    });
                }).catch((err) => {
                    const messages = err.toString();;
                    return res.status(500).json({
                        success: false,
                        error: messages,
                    });
                })
            }).catch(err => {
                const messages = err.toString();;
                return res.status(500).json({
                    success: false,
                    error: messages,
                });
            })

        }).catch(err => {
            const messages = err.toString();;
            return res.status(500).json({
                success: false,
                error: messages,
            });
        })

    }).catch(err => {
        const messages = err.toString();;
        return res.status(500).json({
            success: false,
            error: messages,
        });
    })
}

exports.createMessage = createMessage

function readConversation(req, res, next) {
    const {
        id
    } = req.body;

    Message.update({
        read: 1,
    }, {
        where: {
            conversationId: id
        }
    }).then(message => {
        return res.status(200).json({
            success: true,
            message: message,
        });
    }).catch(err => {
        const messages = err.toString();;
        return res.status(500).json({
            success: false,
            error: messages,
        });
    });
}

exports.readConversation = readConversation

function deliverMessage(req, res, next) {

}

exports.deliverMessage = deliverMessage