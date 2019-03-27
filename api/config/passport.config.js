const JwtStrategy = require('passport-jwt').Strategy,
      User = require('./../api/models/user.model');

// Récupère le JWT secret depuis la config d'environnement      
const { jwtSecret } = require('./environment.config');

// Récupère le namespace ExtractJwt du package passport-jwt
// Ce Namespace expose différentes méthodes d'extraction de token JWT
const { ExtractJwt } = require('passport-jwt');

// Définition des options JWT
const jwtOptions = {
  secretOrKey: jwtSecret, // Secret
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer') // JWT récupéré de la requête
};

/**
 * Méthode de récupération de l'utilisateur à partir de l'identifiant du JWT (sub)
 * 
 * @param {*} payload 
 * @param {*} next 
 * 
 * @public
 */
const jwt = async (payload, next) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) return next(null, user);
    else return next(null, false);
  } 
  catch (error) {
    return next(error, false);
  }
};

// Export de la stratégie JWT
exports.jwt = new JwtStrategy(jwtOptions, jwt);

