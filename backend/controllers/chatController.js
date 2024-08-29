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
        }).populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then (async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email"
            });

            res.send(results);
        });
        

    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});

const createGroupChat = asyncHandler(async (req, res) => {
    if(!req.body.users || !req.body.name){
        res.status(400);
        throw new Error('Please provide group name and users');
    }

    var users = JSON.parse(req.body.users);

    if(users.length<2){
        res.status(400);
        throw new Error('More than 2 users ');
    }

    users.push(req.user._id);

    try{
        const chatData = {
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user._id
        }

        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({_id: createdChat._id}).populate('users', "-password").populate("groupAdmin", "-password");
        res.send(fullChat);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updateChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName: chatName },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if(!updateChat){
        res.status(400);
        throw new Error('Chat not found');
    }else{
        res.send(updateChat);
    }

});

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password");
    
    if(!added){
        res.status(400);
        throw new Error('Chat not found');
    }
    else{
        res.json(added);
    }
});
const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password");
    
    if(!removed){
        res.status(400);
        throw new Error('Chat not found');
    }
    else{
        res.json(removed);
    }
});


module.exports = {acessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup}; 