const Mongoose = require('mongoose'),
      Crypto = require('crypto');

let Schema = Mongoose.Schema;

let schema = new Schema ({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: String,
    ref: 'User',
    required: true,
  },
  used:{
    type: Boolean
  },
});

schema.statics.generate = function(user) {

  const tokenObject = new tokenGeneration();

  tokenObject.token = `${user._id}.${Crypto.randomBytes(40).toString('hex')}`;
  tokenObject.userId = user._id;
  tokenObject.userEmail = user.email;
  tokenObject.used = false;

  // console.log(tokenObject);
  tokenObject.save();

  return tokenObject;
};


schema.statics.findUserId = async function(token) {

  try {
    // const { refreshObject } = options;
    // console.log(token);
    const tokenUser = await this.findOne({token: token});
    // console.log(tokenUser.userId);

    if(!tokenUser) throw Boom.badRequest('A token is required');
    return tokenUser;
  }
  catch(e) {
    console.log(e.message);
  }
  
}

const tokenGeneration = Mongoose.model('TokenGeneration', schema);

module.exports = tokenGeneration;