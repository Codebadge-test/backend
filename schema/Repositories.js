var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var RepositoriesSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    Maintainers: [String],
    repositories: [String],
    contributors:[String]
  });
  var Repositories = mongoose.model('Repositories', RepositoriesSchema);