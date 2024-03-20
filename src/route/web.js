import express from 'express';
import {HomePage , userpost ,deleteuser , useredit , handleUpdate} from '../controller/homeController'
import {HandleLogin} from '../controller/usersController' ;
import {validatorUserLogin} from "../validator/userValidate" ;
let router = express.Router(); 

let initWebRouter = (app) => {
    router.get('/', HomePage);
    router.post('/userpost', userpost);
    router.get('/deleteuser/:id', deleteuser);
    router.get('/edituser/:id', useredit);
    router.post('/handleUpdate', handleUpdate);
    

    router.post('/api/login', validatorUserLogin ,HandleLogin);
    return app.use("/",router) ;
}

module.exports = initWebRouter