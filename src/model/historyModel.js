const mongoose = require("mongoose");
// Định nghĩa Schema
// lịch sử đặt phòng khám 
const historySchema = new mongoose.Schema({
    patientid: {
        type: String,
        required: true
    },
    doctorid: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   
    created_at: {
        type: Date,
        default: Date.now // Giá trị mặc định là thời gian hiện tại
    },
    // url file 
    files:{
        type: String,
        required: true
    },
   
});

// Tạo Model từ Schema
const history = mongoose.model("history", historySchema);

module.exports = history; // Export Model để có thể sử dụng ở những nơi khác trong ứng dụng của bạn
