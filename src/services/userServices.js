import User from "../model/userModel";
let bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const handleUserLogin = async (email, pass) => {
    try {
        let userdata = {};

        let isCheckEmail = await CheckEmail(email);
        if (isCheckEmail) {
            // check email tồn tại
            let userInfo = await User.findOne({ email: email }).exec();
            if (userInfo) {
                let check = await bcrypt.compareSync(pass, userInfo.password); // false
                if(check){
                    userdata.message = "OK";
                    userdata.errorCode = 0;
                    console.log(userInfo);
                    const token = await  jwt.sign({ id: userInfo.id, email: userInfo.email}, 'loi', { expiresIn: '1h' });
                    userdata.token =  token;
                    console.log(token);
                    return userdata;

                }else{
                    userdata.message = "sai mk";
                    userdata.errorCode = 3;
                    return userdata;
                }
            } else {
                userdata.message = "email không tồn tại";
                userdata.errorCode = 2;
                return userdata;
            }
        } else {
            // check email không tồn tại
            userdata.message = "email không tồn tại";
            userdata.errorCode = 2;
            return userdata;
        }
    } catch (error) {
        return res.status(500).json({ errorCode: 1, message: error.message });
    }
};
const CheckEmail = async (email) => {
    try {
        let userInfo = await User.findOne({ email: email }).exec();
        if (userInfo) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return res.status(500).json({ errorCode: 1, message: error.message });
    }
};



const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token không được cung cấp' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token không hợp lệ' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = {
    handleUserLogin,
};
