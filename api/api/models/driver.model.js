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
  phoneNumber: {
    type: String,
    required: 'phoneNumber is required'
  },
  address: {
    street : String,
    number : String,
    zip : String,
    city : String,
    country : { type : String }
  },
  licenceType: {
    type: String,
    required: 'licence type is required'
  },
  licenceNumber: {
    type: String,
    required: 'licence number is required'
  },
  medicalSelectionDate: {
    type: Date,
    required: 'medical selection date is required'
  },
  pac: {
    type: Date,
    required: 'pac is required'
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
  }
});

module.exports = Mongoose.model('Driver', schema);