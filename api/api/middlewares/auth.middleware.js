const Passport = require('passport'),
      Boom = require('boom'),
      User = require('../models/user.model'),
      ES6Promisify = require('es6-promisify');

const ADMIN = 'agent';
const LOGGED_USER = 'client';

/**
 * Callback de la méthode Passport.authenticate
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} roles 
 * 
 * @private
 */
const _handleJWT = (req, res, next, roles) => async (err, user, info) => {

  const error = err || info;

  const logIn = ES6Promisify.promisify(req.logIn);
  // console.log(user);
  // console.log(req.logIn);
  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } 
  catch (e) {
    return next(Boom.forbidden(e.message));
  }

  if (roles === LOGGED_USER) 
  {
    if (user.role !== 'client' && req.params.userId !== user._id.toString()) 
    {
      return next(Boom.forbidden('Forbidden area'));
    }
  } 
  else if (!roles.includes(user.role)) 
  {
    return next(Boom.forbidden('Forbidden area'));
  } 
  else if (err || !user) 
  {
    return next(Boom.badRequest(err.message));
  }

  req.user = user;

  return next();
};

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

/**
 * Méthode d'authentification avec curried function
 * Ce n'est pas un gros mot.
 * Cela dit, ça pique un peu la première fois.
 * Lire comme ceci : Exécute en tant que middleware Passport.authenticate, en lui passant les paramètres des deux premières exécutions
 */
exports.authorize = (roles = User.role) => (req, res, next) => Passport.authenticate( 'jwt', { session: false }, _handleJWT(req, res, next, roles) ) (req, res, next);
