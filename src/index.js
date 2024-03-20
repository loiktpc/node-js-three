import express from 'express'; 
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine' ;
import initWebRouter from './route/web' ;
import {connect} from './config/connectDB'
var cors = require('cors')
require('dotenv').config()
let app = express(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config api fe http 
app.use(cors())

configViewEngine(app) ;

initWebRouter(app) ;
// db.connect() ;
connect() ;

let port = process.env.PORT || 6969 ;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});