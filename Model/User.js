const Schema = require('mongoose').Schema;
const Model = require('mongoose').model;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true
});


const User = Model('User', userSchema);

module.exports = User; 