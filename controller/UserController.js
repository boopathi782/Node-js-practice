const userModel =  require('../Model/userModel.js')
const bcrypt = require('bcrypt')

exports.testFunction = (req,res)=>{
    // console.log("fasdfsdafdasfsdafidfo8euih9");
     res.status(200).send({
        'status':200,
        'message':"Hi from controller page"
    }); 
};




/* refer --  https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/ */
// exports.post("/add_user", async (request, response) => {

exports.adduser =  async (request, response) => {
   
    try {
      const user = new userModel(request.body);
      
      // console.log("-------------------------->>>>>",user);
     /*  const hash = await bcrypt.hash() */

      const hashpassword = await bcrypt.hash(user.password, 10);
      user.password = hashpassword;

      // console.log("---------------<br>----------->>>>>",user);


     var result =  await user.save();
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
};

exports.getuser = async (request, response) => {

  try {
  const users = await userModel.find({});
    response.send(users);

              console.log("--------ddd---->>",request.userModel);

  } catch (error) {
    response.status(500).send(error);
  }
}; 

exports.login = async (req, res) => {

    try {
        // console.log("---------->",req.body.password); return false;

        var users_result = await userModel.findOne({email: req.body.email});
        //   res.send(users_result);
        // res.send("Login success")
        console.log(req.body.password)
        console.log(users_result)
        console.log("---------------->>",users_result.password)



        bcrypt.compare(req.body.password, users_result.password, function(err, result) {
            // result == true
            if(result)
            res.send("Login success")
            else{
            res.send("Login filed ")
                
            }
        });  
    } catch (error) {
      res.status(500).send(error);
    }
  }; 


  exports.update_user = async (req, res) => {

    try {

      var filter = {id: req.body.id};
      var update = {age: '35'};

      var users_result = await userModel.findByIdAndUpdate({_id: req.body.id}, {age: req.body.age }/* , function(err, result){
            if(err){
                console.log("------------>>>",err);
              }
              console.log("RESULT: " + users_result);       
            } */
      );

      if(users_result){
        res.send('update Done') 
      }else{
        res.send('update failed') 

      }
    
      // console.log(users_result) 

    } catch (error) {
      res.status(500).send(error);
    }
  }; 

 