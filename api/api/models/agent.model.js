const Mongoose = require('mongoose');
let Schema = Mongoose.Schema;

let schema = new Schema ({
  firstname: {
    type: String,
    required: 'firstname is required'
  },
  lastname: {
    type: String,
    required: 'lastname is required'
  },
  email: {
    type: String,
    required: 'email is required',
    unique: true
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
  }
});

module.exports = Mongoose.model('Agent', schema);