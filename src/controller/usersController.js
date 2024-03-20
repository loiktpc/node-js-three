import User from "../model/userModel";
import { handleUserLogin } from "../services/userServices";
const { validationResult } = require("express-validator");

const HandleLogin = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Collect error messages
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(200).json({ errors: errorMessages , errorCode: 1});
    }
    try {
        let { email, password } = req.body;

        let data =  await handleUserLogin(email, password);
        console.log(data);
        if(data){
            return res
            .status(200)
            .json(data);
        }
    } catch (error) {
        return res
            .status(500)
            .json({ errorCode: 1, message: error.message });
    }
};

module.exports = {
    HandleLogin,
};
