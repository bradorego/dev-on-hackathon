var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {'type': String, 'unique': true},
  password: String,
  distributionLists: Array,
  pastMessages: Array
});

module.exports = mongoose.model('User', userSchema);
