const Mongoose = require('mongoose'),
      Boom = require('boom'),
      Pricing = require('../services/fetch-pricing.service');

let Schema = Mongoose.Schema;

let status = ["traité", "attente", "refusé", "accepté"]

let schema = new Schema ({
  idClient: {
    type: Mongoose.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: status
  },
  placeStart: {
    street : {
      type : String,
      required : true
    },
    number : {
        type : String,
        required : true
    },
    zip : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    country : {
        type : String,
        required : true
    }
  },
  placeEnd: {
    street : {
      type : String,
      required : true
    },
    number : {
        type : String,
        required : true
    },
    zip : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    country : {
        type : String,
        required : true
    }
  },
  dateArrival : {
    type : String,
    required : true,
  },
  dateDeparture :{
    type : String,
    required  :true,
  },
  totalKm : {
    type : Number,
    required : true,
  },
  totalKmPrice : {
    type : Number,
    required: true
  },
  nbrPassenger : {
      type : String,
      required : true,
  },
  options : {
      type : Array
  },
  optionsPrice : {
    type : Number,
    required: true
  },
  numberDriver : {
      type : Number,
      required : true,
  },
  numberDriverPrice : {
      type : Number,
      required: true
  },
//   capacityAutocar : {
//       type : Number,
//       required : true,
//   },
  numberAutocar : {
      type : Number,
      required : true,
  },
  numberAutocarPrice : {
      type : Number,
      required: true
  },
  price : {
      type : Number,
      required : true,
  },
  com : {
      type : String
  },
  dateCreation : {
      type : Date,
      default : Date.now()
  }
});

schema.methods.findOneandCalculatePrice = async function(data) {
    // console.log(data);
    this.status = data.status;
    this.totalKm = data.totalKm;
    this.numberAutocar = data.numberAutocar;
    this.numberDriver = data.numberDriver;
    const pricings = await Pricing.getPricing();
    // console.log(pricings);
    this.totalKmPrice = this.totalKm * pricings.priceKm;
    let options = this.options;
    // console.log(this);
    options.forEach(option => {
        if (option === "remorque")
        {
            this.optionsPrice += pricings.options.remorque;
        }
        else if (option === "wifi")
        {
            this.optionsPrice += pricings.options.wifi;
        }
        else if (option === "toilettes")
        {
            this.optionsPrice += pricings.options.wc;
        }
        else if (option === "tv")
        {
            this.optionsPrice += pricings.options.tv;
        }
    });
    this.numberDriverPrice = this.numberDriver * pricings.priceDriver;
    this.numberAutocarPrice = this.numberAutocar * pricings.priceCar;
    let totalPrice = this.totalKmPrice + this.optionsPrice + this.numberDriverPrice + this.numberAutocarPrice;
    this.price = totalPrice + (totalPrice * pricings.vat);
    // console.log(this.optionsPrice);
}

schema.statics.status = status;

module.exports = Mongoose.model('Quote', schema);