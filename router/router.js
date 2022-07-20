const express = require('express');
const appRoute = express.Router();
// const appRoute = express();

const UserController = require('../controller/UserController');

/* appRoute.get('/my',(req,res)=>{
    console.log("fasdfsdafdasfsdafidfo8euih9");
     res.send({'message':"Hi    from router page"}); 
}); */

appRoute.get('/my', UserController.testFunction)
appRoute.post('/adduser', UserController.adduser)
appRoute.post('/login', UserController.login)
appRoute.get('/getuser', UserController.getuser)
appRoute.post('/update_user', UserController.update_user)


module.exports = appRoute;
