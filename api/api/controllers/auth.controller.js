const HTTPStatus = require('http-status'),
      User = require('../models/user.model'),
      RefreshToken = require('../models/refresh-token.model'),
      TokenGen =require('../models/tokengeneration.model'),
      UpdatePassword = require('../services/updateChangedPassword.service'),
      Moment = require('moment-timezone'),
      Nodemailer = require('../services/nodemailer.service');

const { jwtExpirationInterval } = require('../../config/environment.config');

/**
* Build a token response and return it
*
* @param {Object} user
* @param {String} accessToken
*
* @returns A formated object with tokens
*
* @private
*/
const _generateTokenResponse = function(user, accessToken) {
  const tokenType = 'Bearer'; // Précise le type de token
  const refreshToken = RefreshToken.generate(user); // Génère un token de rafraîchissement
  const expiresIn = Moment().add(jwtExpirationInterval, 'minutes'); // Allonge le délais de 15 minutes par rapport à l'instant présent
  return { tokenType, accessToken, refreshToken, expiresIn };
}

/**
 * Create and save a new user
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * 
 * @return JWT|next
 * 
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const user = await (new User(req.body)).save();
    const token = _generateTokenResponse( user, user.token() );
    res.status(HTTPStatus.CREATED);
    return res.json({ token, user: user.transform() });
  } 
  catch (error) {
    return next( User.checkDuplicateEmail(error) );
  }
};

/**
 * Connect user if valid username and password is provided
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * 
 * @return JWT|next
 * 
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const {user, accessToken}  = await User.findAndGenerateToken(req.body);
    let role = user.role
    // const token = _generateTokenResponse(user, accessToken);
    return res.json({user : role, id : user.refId, accessToken});
  } 
  catch (error) {
    return next(error);
  }
};

/**
 * Refresh JWT token by RefreshToken removing, and re-creating 
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * 
 * @return JWT|next
 * 
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const { email, password, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({ email, password, refreshObject });
    const response = _generateTokenResponse(user, accessToken);
    return res.json(response);
  } 
  catch (error) {
    return next(error);
  }
};

/**
 * Create JWT token for the first connection of a client
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * 
 * @return JWT|next
 * 
 * @public
 */
exports.createJwtClient = async(req, res, next) =>{
  console.log(req.body);
  try {
      const token = await TokenGen.findUserId(req.body.token);
      const emailUser = await User.findOne({ _id : token.userId });
      await RefreshToken.findOneAndRemove({
          userEmail : emailUser.email,
      });
      const {user, accessToken} = await User.findAndGenerateTokenFirstConnectClient({email : emailUser.email});
      const response = _generateTokenResponse(user, accessToken);
      await UpdatePassword.updateUsedToken(token._id);
      return res.json(response);
  } catch (err) {
      return next(err);
  }
};
  /** 
* PATCH Password 
*/
exports.updatePwd = async (req, res, next) =>{
  try{
      const token = await TokenGen.findOne({userId : req.params.userId});
      let password = await User.hashChangedPwd(req.body.password);
      console.log('ici');
      await User.findByIdAndUpdate(req.params.userId, {password : password}, {override : true, upsert : true, new : true});
      UpdatePassword.updateUsedToken(token._id);
      return next();
  }catch(err){
      // next(User.checkDuplicateEmail(err));
      console.log(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    Nodemailer.sendMail(req.body, 'message');
  } catch (error) {
    console.log(error.message);
  }
}
