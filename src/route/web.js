import express from 'express';
import {HomePage , userpost ,deleteuser , useredit , handleUpdate , homejson} from '../controller/homeController'
import {HandleLogin ,GetAllUser , CreatedUser , deleteUserAPI , updateUserAPI , getDetailInfoUser} from '../controller/api/usersController' ;
import {validatorUserLogin} from "../validator/userValidate" ;
import {verifyToken , refreshToken} from "../services/userServices" ;
let router = express.Router(); 

let initWebRouter = (app) => {
    router.get('/', HomePage);
    router.get('/home', homejson);
    router.post('/userpost', userpost);
    router.get('/deleteuser/:id', deleteuser);
    router.get('/edituser/:id', useredit);
    router.post('/handleUpdate', handleUpdate);
    
    // API 
    // get all và get one 
    router.get('/api/getAlluser' ,GetAllUser);
    router.get('/api/getdetailinfouser/:id' ,getDetailInfoUser);
    router.post('/api/login', validatorUserLogin ,HandleLogin);
    router.post('/api/GetrefreshToken', refreshToken);
    router.post('/api/users',CreatedUser);
    router.delete('/api/users/:id',deleteUserAPI);
    router.put('/api/users/:id',updateUserAPI);

    return app.use("/",router) ;
}

module.exports = initWebRouter