const Mongoose = require('mongoose'),
      Bcrypt = require('bcrypt'),
      Moment = require('moment-timezone'),
      Jwt = require('jwt-simple'),
      Boom = require('boom');

const { env, jwtSecret, jwtExpirationInterval } = require('../../config/environment.config');

let Schema = Mongoose.Schema;

let schema = new Schema({
  email: {
    type: String,
    required: 'Email is required',
    unique: true
  },
  password: {
    type: String,
    required: 'password is required'
  },
  refId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'role'
  },
  role: {
    type: String,
    required: true,
    enum: ['client', 'agent', 'driver']
  }
});

schema.methods.transform = function() {
  // fields = whitelist
  const fields = ['email', 'role'];
  const object = {};

  fields.forEach( (field) => {
    object[field] = this[field];
  });
  return object;
};

schema.methods.passwordMatches = async function(pwd) {
  return await Bcrypt.compare(pwd, this.password);
};

/**
 * Génère un JWT token
 */
schema.methods.token = function() {
  const payload = {
    iat : Moment().unix(), // Date courante format unix
    exp : Moment().add(jwtExpirationInterval, 'minutes').unix(), // Date courante + n minutes format unix
    sub : this._id // Id de l'utilisateur courant
  };
  return Jwt.encode(payload, jwtSecret); // Encodage au format JWT
};

schema.pre('save', async function(next){
  try{
    if(!this.isModified('password'))
    {
      return next();
    }
    let salt = 10
    let hash = await Bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
  }
  catch(e){
    next(Boom.expectationFailed(e.message));
  }
});

/**
 * Affiche une erreur adaptée si l'email existe déjà
 * Cette méthode est utilisée comme fallback en cas d'erreur sur une route de création/édition d'un user
 */
schema.statics.checkDuplicateEmail = function(error) {
  if (error.name === 'MongoError' && error.code === 11000) {
    return Boom.conflict(
      'Validation error',
      {
        errors: [{
          field: 'email',
          location: 'body',
          messages: ['"Email" already exists'],
        }]
      });
  }
  return error;
};

/**
* 1. Charge un utilisateur via son addresse email
* 2. Vérifie les conditions suivantes :
*   - User existe
*   - Passwords concordent
*   - Le RefreshToken n'est pas expiré
* 3. Si ces conditions sont vérifiées, retourne un objet qui contient le user et son JWT
*
* @param {Object} options - email, password et refreshObject
*
* @returns {Object|Error}
*/
schema.statics.findAndGenerateToken = async function(options) {

  const { email, password, refreshObject } = options;

  if (!email) throw Boom.badRequest('An email is required to generate a token');
  if (!password) throw Boom.badRequest('A password is required to authorize a token generating');

  const user = await this.findOne({ email });

  if (!user)
  {
    throw Boom.notFound('User not found');
  }
  else if (await user.passwordMatches(password) === false)
  {
    throw Boom.unauthorized('Password must match to authorize a token generating');
  }
  else if (refreshObject && refreshObject.userEmail === email && Moment(refreshObject.expires).isBefore())
  {
    throw Boom.unauthorized('Invalid refresh token.');
  }

  return { user, accessToken: user.token() };
};

schema.statics.findAndGenerateTokenFirstConnectClient = async function(email) {
  if(!email) throw Boom.badRequest('An email is required to generate a token');
  const user = await this.findOne({email : email.email});
  return { user, accessToken : user.token() };
};

schema.statics.hashChangedPwd = async function(password){
  try {
    console.log(password);
      let salt = env === 'staging' ? 1 : 10;
      let hash = await Bcrypt.hash(password, salt);
      password = hash;
      return password;
  } catch (err) {
      throw(Boom.badImplementation(err.message));
  }
};

module.exports = Mongoose.model('User', schema);