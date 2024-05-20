const asyncHandler = require('express-async-handler');
const User = require('../Model/User');
const bcrypt = require("bcrypt");
const generateToken = require('../config/generateToken');

// ******************** Register Function ******************** //
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, avatar });

    if (user) {
        return res.status(201).json({
            message: "User created successfully",
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } else {
        return res.status(400).json({ error: "Failed to create user" });
    }
});

// ******************** Login Function ******************** //
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Incorrect password! Try again" });
    }

    return res.status(200).json({
        message: "Login successfull",
        token: generateToken(user._id),
        data: {
            _id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        },
    });
});

// ******************** getSearchUsers Function ******************** //
const getSearchUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search;

    const users = await User.find({
        "$or": [
            { "name": { $regex: keyword, $options: "i" } },
            { "email": { $regex: keyword, $options: "i" } }
        ]
    }).find({ _id: { $ne: req.user._id } }); // Exclude the logged-in user

    return res.status(200).json(users)
})

module.exports = { registerUser, loginUser, getSearchUsers };