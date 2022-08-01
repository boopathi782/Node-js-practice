const userModel =  require('../Model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
let referesh_token_data = [];


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


//  request.send(user);
     
    //  if(user.password != null || user.password != undefined  || 0){
            if(user.password){
              // console.log("-----------------if--------->>>>>");
              const hashpassword = await bcrypt.hash(user.password, 10);
              user.password = hashpassword;
            }else{
             /*  error message print from model page */
              // response.send("password is required");
            }
                      

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

               /*  console.log("----email------>",req.body.email);
                console.log("-----password----->",req.body.password);
                return false; */
                

        var users_result = await userModel.findOne({email: req.body.email});
        //   res.send(users_result);
        // res.send("Login success")

       /*  console.log(req.body.password)
        console.log(users_result)
        console.log("---------------->>",users_result.password) */

 

        bcrypt.compare(req.body.password, users_result.password, function(err, result) {
            // result == true

            // Create token
            let accessToken = jwt.sign( { user_id: users_result._id, user_name: users_result.name, email: users_result.email, }, "Acccesss", { expiresIn: "1d", } );
            let refereshToken = jwt.sign({ user_id: users_result._id, user_name: users_result.name, email: users_result.email },'Referesh', {expiresIn: "7d"});
                referesh_token_data.push(refereshToken);
            

            
            //to store the value to json object
            var objresult = users_result.toObject();
            delete  objresult.password; //delete the some object record

            // save user token
            objresult.accessToken = accessToken;
            objresult.referesh_token_data = refereshToken;
         

            // console.log("----------->>>>",accessToken)

            if(result){
              res.status(201).json(objresult);
              console.log("Login success");
            } 
            else{
              res.send("Login filed ");
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


  exports.referesh_token = async (req,res)=> {

  // app.post("/referesh_token", (req,res)=>{
    const refereshToken =  req.body.token;  
    
    if(!refereshToken || !referesh_token_data.includes(refereshToken)){
          return  res.status(401).json({message: "user not authenticated  "})      
    }
    jwt.verify(refereshToken, "Referesh", (err, user)=>{
            if(!err){
                  const accessToken =  jwt.sign({ username:user.name }, 'Acccesss', {expiresIn: "1d"} );
                  return  res.status(200).json(accessToken)
              }else {
                  return  res.status(401).json({message: "user not authenticated  "})      
              }
    });  
  };

  exports.protected  = async (req,res)=>{
    console.log("--------------user data- from controller----------------->>>>>",req.user);

      res.send("protected route")
  }
 