var mongoose=require('mongoose');
var Schema=mongoose.Schema;
 
var contactSchema = new Schema({
  fName: String,
  lName: String,
  email: String,
  schedule: String,
  phone: String,
  message: String
});
 
module.exports = mongoose.model('Contact', contactSchema);