var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var UsersSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    profileLink: String,
    techStack: [String],
    orgpnts:[{orgId:String,pnts:Number,Users=String}]
  });
  var Users = mongoose.model('Users', UsersSchema);