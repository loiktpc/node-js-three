const { body } = require("express-validator");

const validatorUserLogin = [
    body("email")  
        .isEmail()
        .withMessage("Email không hợp lệ"),

    body("password")
        .isLength({ min: 5 })
        .withMessage("Mật khẩu phải có ít nhất 5 ký tự"),
];

module.exports = {
    validatorUserLogin,
};
