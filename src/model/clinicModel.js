const mongoose = require("mongoose");
import connect from "../config/connectDB";
// Định nghĩa Schema
// phòng khám 
const clinicSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgae: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now, // Giá trị mặc định là thời gian hiện tại
    },
    name: {
        type: String,
        required: true,
    },
});

// Tạo Model từ Schema
const clinic = mongoose.model("clinic", clinicSchema);

module.exports = clinic; // Export Model để có thể sử dụng ở những nơi khác trong ứng dụng của bạn
