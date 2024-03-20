const mongoose = require("mongoose");
import connect from "../config/connectDB";
// Định nghĩa Schema
//  specialtyModel và clinic và doctor 

const doctor_clinic_specialtySchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
    },
    clinicId: {
        type: String,
        required: true,
    },
    specialtyId: {
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
const doctor_clinic_specialty = mongoose.model("doctor_clinic_specialty", doctor_clinic_specialtySchema);

module.exports = doctor_clinic_specialty; // Export Model để có thể sử dụng ở những nơi khác trong ứng dụng của bạn
