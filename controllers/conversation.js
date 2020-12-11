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
        User.findAll({
            where: {
                id: req.user.id
            }
        }).then(users => {
            return res.status(200).json({
                success: true,
                user: users,
                data: conversation,

            });
        }).catch(err => {
            const messages = "Something went wrong";
            return res.status(500).json({
                success: false,
                error: messages,
            });
        })

    }).catch(error => {
        const messages = "Something went wrong";
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
        secondUserId: id,
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
            }).catch(error => {
                const messages = "Something went wrong";
                return res.status(500).json({
                    success: false,
                    error: messages,
                });
            })
        }
    ).catch(err => {
        const messages = "Something went wrong";
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
        conversationId: id,
        userId: req.user.id,
    }).then(message => {
        return res.status(200).json({
            success: true,
            data: message,
            // message: message,
        });
    }).catch(err => {
        const messages = "Something went wrong";
        return res.status(500).json({
            success: false,
            error: messages,
        });
    })
}

exports.createMessage = createMessage

function readConversation(req, res, next) {}

exports.readConversation = readConversation