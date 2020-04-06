var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var BadgesSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    createdBy: [String],
    users: [{orgId:String,awardedfor:String}]
  });
  var Badges = mongoose.model('Badges', BadgesSchema);