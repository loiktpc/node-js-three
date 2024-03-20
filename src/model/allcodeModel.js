const mongoose = require("mongoose");
// Định nghĩa Schema

const allcodeSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value_en: {
        type: String,
        required: true
    },
    value_vi: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now // Giá trị mặc định là thời gian hiện tại
    },
    timestamps: true
});

// Tạo Model từ Schema
const AllCode = mongoose.model("AllCode", allcodeSchema);

module.exports = AllCode; // Export Model để có thể sử dụng ở những nơi khác trong ứng dụng của bạn
