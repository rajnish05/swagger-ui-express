const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Creating User Schema
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    contact:
    {
        type: String,
        trim: true,
        required: false
    },
    email:
    {
        type: String,
        trim: true,
        required: true
    },
    password:
    {
        type: String,
        trim: true,
        required: true
    }


});

module.exports = User = mongoose.model("user", userSchema);