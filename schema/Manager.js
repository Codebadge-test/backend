var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var ManagersSchema = new Schema({
    boards:[String]
  });
  var Managers = mongoose.model('Managers', ManagersSchema);