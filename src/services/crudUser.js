// nhận data phía controller và thao tác về phía db 
import User from "../model/userModel";

let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

let createdNewUser = async (data) =>{

    try {
        let hashpass = await handlehashPasswordUser(data.password);
        let newdata = {
            lastName : data.lastName ,
            password:  hashpass
        }
        console.log('newdata', newdata);
        const newUser = await new User(newdata);
        await newUser.save();

        return 'thêm thành công'
    } catch (error) {
        console.log(error);
    }


    console.log('check password hash:',hashpass);
   
}

let handlehashPasswordUser = async (password) =>{
    try {
        let hashpass = await bcrypt.hashSync(password, salt);

        return hashpass

    } catch (error) {
        console.log(error);
    }
}
let getAllUser = async () =>{
    try {
        const Getdatausers = await User.find({});
        return Getdatausers
    } catch (error) {
        console.log(error);
    }
}
let GetInfoUser = async (id) =>{
    try {
        const Getdatausers = await User.findById(id).exec();
        console.log(Getdatausers);
        return Getdatausers
    } catch (error) {
        console.log(error);
    }
}

let Updateusers = async (id , lastname) =>{
    console.log(id , lastname);
    const updateDatauser = await User.findByIdAndUpdate(id , {lastName:lastname}).exec();
    console.log(updateDatauser);
    return updateDatauser
}
module.exports = {
    createdNewUser , getAllUser , GetInfoUser , Updateusers
}
