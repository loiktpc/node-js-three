const mongoose = require("mongoose");
import connect from "../config/connectDB";
// Định nghĩa Schema
// chuyên khoa  specialtyModel
const specialtySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now, // Giá trị mặc định là thời gian hiện tại
    },
   
});

// Tạo Model từ Schema
const specialty = mongoose.model("specialty", specialtySchema);

module.exports = specialty; // Export Model để có thể sử dụng ở những nơi khác trong ứng dụng của bạn
