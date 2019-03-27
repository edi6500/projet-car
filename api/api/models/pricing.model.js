const Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let schema = new Schema ({
  vat: {
    type: Number,
    required: true
  },
  priceKm: {
    type: Number,
    required: true
  },
  priceCar: {
    type: Number,
    required: true
  },
  priceDriver: {
    type: Number,
    required: true
  },
  options: {
    wc : { type : Number, required : true },
    remorque : { type : Number, required : true },
    tv : { type : Number, required : true },
    wifi : { type : Number, required : true }
  }
})

module.exports = Mongoose.model('Pricing', schema);