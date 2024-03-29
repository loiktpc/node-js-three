const mongoose = require("mongoose");
import connect from "../config/connectDB";
// Định nghĩa Schema

const userSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: Boolean,
        required: true,
    },

    created_at: {
        type: Date,
        default: Date.now, // Giá trị mặc định là thời gian hiện tại
    },
    roleId: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    // vị trí
    positionId: {
        type: String,
        // required: true,
    },
    imgae: {
        type: String,
        // required: true,
    },
   
});

// Tạo Model từ Schema
const User = mongoose.model("user", userSchema);

module.exports = User; 