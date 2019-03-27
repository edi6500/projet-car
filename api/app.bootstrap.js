const App = require('./config/app.config'),
      Mongoose = require('./config/mongoose.config'),
      Logger = require('./config/logger.config');

const { port, env } = require('./config/environment.config');

/** Connect to MongoDB server */
Mongoose.connect();

/** Listen to requests */
App.listen( port, () => Logger.info(`HTTP server is now running on port ${port} (${env})`));

/**
 * Exports Express
 */
module.exports = App;