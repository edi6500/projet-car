const Mongoose = require('mongoose'),
      Boom = require('boom');

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
  sexe: {
    type: String
  },
  email: {
    type: String,
    required: 'email is required',
    unique: true
  },
  phoneNumber: {
    type: String,
    required: 'phoneNumber is required'
  },
  address: {
    street : String,
    number : String,
    zip : String,
    city : String,
    country : String
  },
  companyAddress: {
    street : String,
    number : String,
    zip : String,
    city : String,
    country : String
  },
  companyName: {
    type: String
  },
  companyPhone: {
    type: String
  },
  tvaNumber:{
    type: String
  },
  iban: {
    type: String,
    required: 'iban is required',
    unique: true
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
  },
  quotesId: {
    type: Array
  }
});

schema.statics.checkDuplicateIban = function(error) {
  if (error.name === 'MongoError' && error.code === 11000) {
    return Boom.conflict(
      'Validation error',
      {
        errors: [{
          field: 'iban',
          location: 'body',
          messages: ['"Iban" already exists'],
        }]
      });
  }
  return error;
};

module.exports = Mongoose.model('Client', schema);