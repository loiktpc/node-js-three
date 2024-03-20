const mongoose = require("mongoose");
import connect from "../config/connectDB";
// Định nghĩa Schema

const BookingSchema = new mongoose.Schema({
    statusId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    patientid: {
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
const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking; // Export Model để có thể sử dụng ở những nơi khác trong ứng dụng của bạn
