var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var TemplatesSchema = new Schema({
    regex:RegExp,
  });
  var Templates = mongoose.model('Templates', TemplatesSchema);