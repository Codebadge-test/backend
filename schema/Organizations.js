var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var OrganizationsSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    admins: [String],
    repositories: [String],
    projectManagers: [{ boardType: String, token: String,id:String }],
    badges: { levels: [{levelName:String}],specials:[{badgeName:String}]},
    pointSystemId: String,
    templates: {
      issue: String,
      pr:  String
    }
  });
  var Organizations = mongoose.model('Organizations', OrganizationsSchema);