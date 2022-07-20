

// const mongoose = require("mongoose");


// mongoose.connect('mongodb://localhost:27017/node_practice',
//     {
//     useNewUrlParser: true,
//  /*    useFindAndModify: false, */
//     useUnifiedTopology: true
//     }
// ).then(()=>{
//     console.log("data base connected successfully");
    
// }).catch((err)=>{
//     console.log("data base Not connect !!!", err);
// });

const mongoose = require("mongoose");
var mongoose_db = require('../config/db');
const bcrypt = require('bcrypt')




var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};


    const UserSchema = new mongoose.Schema({
    
      email: {
          type: String,
          trim: true,
          lowercase: true,
          unique: true,
          required: 'Email address is required',
          validate: [validateEmail, 'Please fill a valid email address'],
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },

      password:{
        type:String
      }, 

      name: {
      type: String,
      /* required: true, */
      default:null
    },
    age: {
      type: Number,
      default: 0,
    },

  });


  /* UserSchema.pre('save', async function(next){
    try{

      const hashpassword = await bcrypt.hash(this.password, 10);
      this.password = hashpassword;
      next();
    }catch(error){
      next(error);
    } 
  }) */

  
  const User = mongoose.model("User", UserSchema);
  
  module.exports = User;