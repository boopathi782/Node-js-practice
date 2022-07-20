const express  = require('express');
const bodyparser = require('body-parser');

const routes  = require('./router/router.js');

const app = express();






app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended: true}));
 
app.use('/user',routes);


/* app.get('/', (req, res)=>{
    res.send("messsage Hi get method is working")

    // res.json({"messsage":"Hi get method is working"})
    // res.json({'message': 'ok'});
}); */

app.listen(3000, ()=>{
    console.log(`Example app listening at http://localhost:${3000}`);
})