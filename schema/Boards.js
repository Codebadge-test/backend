var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var BoardsSchema = new Schema({
    boardName:String,
    lists:[String]
  });

  var Boards = mongoose.model('Boards', BoardsSchema);