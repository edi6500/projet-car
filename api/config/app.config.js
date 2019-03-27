const Express = require('express'),
      BodyParser = require('body-parser'),
      Router = require('../api/routes/v1'),
      Passport = require('passport'),
      Strategies = require('./passport.config'),
      ServiceErrorHandler = require('../api/services/error-handler.service'),
      Cors = require('cors');

const { HTTPLogs, api, env, environments } = require('./environment.config');

const app = Express();

/**
 * Expose body on req.body
 */
app.use( BodyParser.json() );
app.use( BodyParser.urlencoded( { extended : true } ) );

/**
 * Enable CORS - Cross Origin Resource Sharing
 */
app.use( Cors() );

/**
 * Passport configuration
 */
app.use( Passport.initialize() );

// Utilise la stratégie JWT, avec cette implémentation que je passe en paramètre (fonction callback)
Passport.use('jwt', Strategies.jwt);

app.use(`/api/${api}`, Router);

/**
 * Errors handlers
 */
if(env.toUpperCase() === environments.DEVELOPMENT) 
{
  //app.use( ErrorHandler({ log: ServiceErrorHandler.notify }) );
  app.use( ServiceErrorHandler.exit );
  app.use( ServiceErrorHandler.notFound );
}
else 
{
  app.use( ServiceErrorHandler.log, ServiceErrorHandler.exit );
  app.use( ServiceErrorHandler.notFound );
}

module.exports = app;