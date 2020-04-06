var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var CardsSchema = new Schema({
    cardDetails:[{title:String,labels:[String]}],
    points:[{label:String,pnts:Number}]
  });
  var Cards = mongoose.model('Cards', CardsSchema);