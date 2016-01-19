var mongoose=require('mongoose');
var Schema=mongoose.Schema;
 
var listSchema = new Schema({
  rName: String,
  time: Number,
  heat: String,
  ing1num: Number,
  ing1unit: String,
  ing1: String,
  ing2num: Number,
  ing2unit: String,
  ing2: String,
  ing3num: Number,
  ing3unit: String,
  ing3: String,
  procedure: String
});
 
module.exports = mongoose.model('List', listSchema);