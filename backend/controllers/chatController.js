const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const { response } = require("express");

const acessChat = asyncHandler(async (req, res) => {

    const { userId }= req.body;

    if(!userId){
        res.status(400);
        throw new Error('User Id is required');
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } },
            { users: { $elemMatch: { $eq: req.user._id } } }
        ]
    }).populate('users', "-password")
    .populate('latestMessage');

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if(isChat.length>0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [userId, req.user._id]
        }

        try{
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id: createdChat._id}).populate('users', "-password");
            res.send(fullChat);
        }
        catch(error){
            res.status(400);
            throw new Error('Chat not created');
        }
    }
}); 

const fetchChats = asyncHandler(async (req, res) => {
    try{
        Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        }).then(result=> res.send(result));
        

    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {acessChat, fetchChats};