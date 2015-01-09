var mongoose=require('mongoose');
var Schema=mongoose.Schema;
 
var contactSchema = new Schema({
  fName: String,
  lName: String,
  email: String,
  status: String,
  schedule: String,
  message: String
});
 
module.exports = mongoose.model('Contact', contactSchema);