import User from "../model/userModel";
let bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);
const _CONF = require("../config/Jwt");

const jwt = require("jsonwebtoken");
var refreshTokens = {}; // tao mot object chua nhung refreshTokens

const handleUserLogin = async (email, pass) => {
    try {
        let userdata = {};

        let isCheckEmail = await CheckEmail(email);
        if (isCheckEmail) {
            // check email tồn tại
            let userInfo = await User.findOne({ email: email }).exec();
            if (userInfo) {
                let check = await bcrypt.compareSync(pass, userInfo.password); // false
                if (check) {
                    userdata.message = "OK";
                    userdata.errorCode = 0;
                    console.log(userInfo);
                    const token = await jwt.sign(
                        { id: userInfo.id, email: userInfo.email },
                        _CONF.SECRET,
                        { expiresIn: _CONF.tokenLife }
                    );
                    const refreshToken = jwt.sign(
                        { id: userInfo.id, email: userInfo.email },
                        _CONF.SECRET_REFRESH,
                        { expiresIn: _CONF.refreshTokenLife }
                    );
                    userdata.refreshToken = refreshToken;
                    userdata.token = token;
                    refreshTokens[refreshToken] = userdata;
                    console.log(token);
                    return userdata;
                } else {
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

const handleCreatedUser = async (data) => {
    try {
        let userdata = {};
        let checkuseEmail = await CheckEmail(data.email);
        if (checkuseEmail === true) {
            userdata.message = "Email Đã Tồn tại";
            userdata.errorCode = 1;
            return userdata;
        }
        let hashpass = await handlehashPasswordUser(data.password);
        let newdata = {
            lastName: data.lastName,
            firstName: data.firstName,
            address: data.address,
            email: data.email,
            password: hashpass,
            gender: data.gender == "1" ? true : false,
            roleId: data.roleId,
            phonenumber: data.phonenumber,
        };
        console.log("newdata", newdata);
        const newUser = await new User(newdata);
        await newUser.save();
        if (newUser) {
            userdata.message = "OK";
            userdata.errorCode = 0;
            userdata.data = newUser;
            return userdata;
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorCode: 1, message: error.message });
    }
};

let handlehashPasswordUser = async (password) => {
    try {
        let hashpass = await bcrypt.hashSync(password, salt);

        return hashpass;
    } catch (error) {
        console.log(error);
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log("check token:", token);
    if (!token) {
        return res
            .status(401)
            .json({ message: "Token không được cung cấp", errorCode: 1 });
    }

    jwt.verify(token, "loi", (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Token không hợp lệ", errorCode: 1 });
        }

        req.user = decoded;
        next();
    });
};

/* Get new token when jwt expired . */
const refreshToken = async (req, res, next) => {
    // refresh the damn token
    const { refreshToken, email, id, role_id } = req.body;
    console.log("check refreshToken:", refreshToken);

    // if refresh token exists
    if (refreshToken && refreshToken in refreshTokens) {
        const user = {
            id: id || '65f829cceb4d09f603f22f64',
            role: role_id || 1,
            email: email || "admin@gmail.com",
        };
        const token = jwt.sign(user, _CONF.SECRET, {
            expiresIn: _CONF.tokenLife,
        });
        const response = {
            token: token,
        };
        console.log('check response', response);
        // update the token in the list
        refreshTokens[refreshToken].token = token;
        res.status(200).json(response);
    } else {
        res.status(404).send("Invalid request");
    }
};

const handleDeleteUserAPI = async (id) => {
    try {
        let userdata = {};
        console.log("check id 2", id);
        let checkuser = await User.findOne({ _id: id }).exec();
        console.log("check user:", checkuser);
        if (!checkuser) {
            userdata.message = "không tìm thấy user";
            userdata.errorCode = 1;
            return userdata;
        }
        await User.findByIdAndDelete(id).exec();
        userdata.message = "đã xóa thành công";
        userdata.errorCode = 0;
        return userdata;
    } catch (error) {}
};

// dùng get all và get one
const handleGetAllandOne = async (iduser) => {
    try {
        if (!iduser) {
            const Getdatausers = await User.find({});

            return Getdatausers;
        } else {
            const Getdatausers = await User.findById(iduser).exec();
            return Getdatausers;
        }
    } catch (error) {
        return res.status(500).json({ errorCode: 1, message: error.message });
    }
};

const handleGetInfoUser = async (iduser) => {
    const Getdatausers = await User.findById(iduser).exec();
    return Getdatausers;
}
const handleUpdateUser = async (id, data) => {
    try {
        let userdata = {};
        console.log("check data2:", data);
        console.log("check id 2:", id);
        const Getdatausers = await User.findById(id).exec();
        console.log("check users:", Getdatausers);
        await Getdatausers.updateOne({ $set: data });
        // User.findByIdAndUpdate(id, data )
        userdata.message = "cập nhật thành công";
        userdata.errorCode = 0;
        return userdata;
    } catch (error) {
        return res.status(500).json({ errorCode: 1, message: error.message });
    }
};
module.exports = {
    handleUserLogin,
    handleGetAllandOne,
    verifyToken,
    handleCreatedUser,
    handleDeleteUserAPI,
    handleUpdateUser,
    refreshToken,
    handleGetInfoUser
};
