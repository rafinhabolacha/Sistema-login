const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Login =  new Schema({

   User:{
      type:String
       
      
   },
   password:{
      type:String
       
   }
 
},
{
   timestamps:true, 
});

const user = mongoose.model('Login',Login);

module.exports = user;