const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
token: {
  type: String,
},
deleted: {
  type: Boolean,
},
createdAt: {
  type: Date,
  default: Date.now,
},
updatedAt: {
  type: Date,
  default: Date.now,
},
user_id: {
  type: Schema.Types.ObjectId,
  ref: 'user',
},
},{
  timestamps: true,
}
);
module.exports = mongoose.model('token', tokenSchema);