var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var PointSystemsSchema = new Schema({
    issue: [String], // String is shorthand for {type: String}
    pr: [String],
    comment: [String]
  });
  var PointSystems = mongoose.model('PointSystems', PointSystemsSchema);