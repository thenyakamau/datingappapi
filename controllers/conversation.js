const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversation")
const { Op } = require("sequelize");

function fetchConversation(req, res, next) {

    Conversation.findAll({
        where: {
            [Op.or]: [
                { userId: req.user.id },
                { secondUserId: req.user.id }
            ]
        },
        order: [
            ["updatedAt", "DESC"],
        ],
        include: {
            model: Message,
            order: ["createdAt", "ASC"],
        }
    }).then(conversation => {

        //get single from list
        for (var i = 0; i < conversation.length; i++) {
            conversation.userId = conversation[i].userId;
            conversation.secondUserId = conversation[i].secondUserId;
        }

        //fetch the second user from the conversation
        User.findOne({
            where: {
                id: conversation.secondUserId != req.user.id ? conversation.secondUserId : conversation.userId,
            }
        }).then(users => {
            return res.status(200).json({
                success: true,
                user: users,
                conversation: conversation,

            });
        }).catch(err => {
            const messages = err.toString();
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

exports.fetchConversation = fetchConversation

function createConversation(req, res, next) {
    const { id, message } = req.body

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
            }).then(message => {
                return res.status(200).json({
                    success: true,
                    data: conversation,
                    message: message,
                });
            }).catch(err => {
                const messages = err.toString();;
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
    const { id, message } = req.body

    Message.create({
        body: message,
        read: 0,
        conversationId: parseInt(id),
        userId: req.user.id,
    }).then(message => {
        return res.status(200).json({
            success: true,
            message: message,
            // message: message,
        });
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
    const { id } = req.body;

    Message.update({ read: 1, }, { where: { conversationId: id } }).then(message => {
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