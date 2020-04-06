var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var ListsSchema = new Schema({
    listName:String,
    cards:[String]
  });
  var Lists = mongoose.model('Lists', ListsSchema);