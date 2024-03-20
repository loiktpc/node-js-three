import User from "../model/userModel";
import { createdNewUser, getAllUser ,GetInfoUser , Updateusers} from "../services/crudUser";
let HomePage = async (req, res) => {
    try {
        return res.render("pages/home.ejs");
    } catch (error) {
        console.log(error.message);
    }
};
const userpost = async (req, res) => {
    try {
        let data = req.body;
        let mess = await createdNewUser(data);
        console.log("check message ", mess);

        // Lấy tất cả người dùng
        const Getdatausers = await getAllUser();

        return res.render("pages/list.ejs", { Getdatausers });
    } catch (error) {
        console.log("lỗi tại đây", error.message);
        return res
            .status(500)
            .send("Đã xảy ra lỗi khi thêm người dùng: " + error.message);
    }
};

const useredit = async (req, res) => {
    try {
        let iduser = req.params.id;
        let infouser =  await GetInfoUser(iduser) ;
        return res.render("pages/edit.ejs", { infouser });
    } catch (error) {
        console.log(error.message);
    }
};
const deleteuser = async (req, res) => {
    try {
        let id = req.params.id;
        console.log("check id :", id);
        await User.deleteOne({ _id: id });
        console.log("Tài liệu đã được xóa thành công.");

        const Getdatausers = await User.find({});

        return res.render("pages/list.ejs", { Getdatausers });
    } catch (error) {}
};

const handleUpdate = async (req, res) => {
    try {
        let {id , lastName}  = req.body ;
        let updatedatauser = await Updateusers(id,lastName) ;
        const Getdatausers = await User.find({});

        return res.render("pages/list.ejs", { Getdatausers });
    } catch (error) {
        console.log(error);
    }
}
const homejson = async (req, res) => {
    return res.status(200).json({title : 'đây là trang home' , name : 'kim thanh loi'});
}
module.exports = {
    HomePage,
    userpost,
    deleteuser,
    useredit, 
    handleUpdate ,
    homejson
};
