import {
    handleUserLogin,
    handleGetAllandOne,
    handleCreatedUser,
    handleDeleteUserAPI,
    handleUpdateUser,
    handleGetInfoUser
} from "../../services/userServices";
const { validationResult } = require("express-validator");

const HandleLogin = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Collect error messages
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(200).json({ errors: errorMessages, errorCode: 1 });
    }
    try {
        let { email, password } = req.body;

        let data = await handleUserLogin(email, password);
        console.log(data);
        if (data) {
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ errorCode: 1, message: error.message });
    }
};

const GetAllUser = async (req, res) => {
    try {
        let iduser = req.query.id;
        console.log("id", iduser);
        let dataAlluser = await handleGetAllandOne(iduser);

        // console.log("check data", dataAlluser);
        return res.status(200).json({ data: dataAlluser, errorCode: 0 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorCode: 1, message: error.message });
    }
};

const CreatedUser = async (req, res) => {
    try {
        let data = req.body;
        let datares = await handleCreatedUser(data);
        console.log("check data:", datares);
        return res.status(200).json(datares);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorCode: 1, message: error.message });
    }
};

const deleteUserAPI = async (req, res) => {
    try {
        let id = req.params.id;
       
        let datamess = await handleDeleteUserAPI(id);
     
        return res.status(200).json(datamess);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorCode: 1, message: error.message });
    }
};

const updateUserAPI = async (req, res) => {
    try {
        let id = req.params.id;
        console.log("check id :", id);
        let data = req.body;
        // console.log("check data :", data);
        let datares = await handleUpdateUser(id, data);
        console.log(datares);
        return res.status(200).json(datares);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorCode: 1, message: error.message });
    }
};

const getDetailInfoUser = async (req, res) =>{
   try {
    let id = req.params.id;
    let datauser =  await handleGetInfoUser(id) 
    return res.status(200).json({data:datauser, error:0});
   } catch (error) {
    console.log(error);
        return res.status(500).json({ errorCode: 1, message: error.message });
   }
}

module.exports = {
    HandleLogin,
    GetAllUser,
    CreatedUser,
    deleteUserAPI,
    updateUserAPI,
    getDetailInfoUser
};
