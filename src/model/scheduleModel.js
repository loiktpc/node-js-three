const mongoose = require("mongoose");
import connect from "../config/connectDB";
// Định nghĩa Schema
// kế hoạch scheduleModel
const scheduleSchema = new mongoose.Schema({
    currentNumber: {
        type: String,
        required: true,
    },
    maxNumber: {
        type: String,
        required: true,
    },
    doctorId : {
        type: String,
        required: true,
    },

    created_at: {
        type: Date,
        default: Date.now, // Giá trị mặc định là thời gian hiện tại
    },
    timestamps: true,
});

// Tạo Model từ Schema
const schedule = mongoose.model("schedule", scheduleSchema);

module.exports = schedule; // Export Model để có thể sử dụng ở những nơi khác trong ứng dụng của bạn
