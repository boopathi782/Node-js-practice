const mongoose = require("mongoose");
 
 mongoose.connect('mongodb://localhost:27017/node_practice',
    {
    useNewUrlParser: true,
 /*    useFindAndModify: false, */
    useUnifiedTopology: true
    }
).then(()=>{
    console.log("database connected successfully");
    
}).catch((err)=>{
    console.log("database Not connect !!!", err);
});

 
