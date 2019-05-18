
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
const userSchema = new Schema({
 username: {
    type: String
  },
  email: {
   type: String,
  },
  password: {
    type: String
  },
 
},{
    timestamps: true,
});

module.exports = mongoose.model('user', userSchema);