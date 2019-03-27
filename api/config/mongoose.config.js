const Mongoose = require('mongoose');
      Logger = require('./logger.config');

const { mongo, env, environments } = require('./environment.config');

Mongoose.Promise = global.Promise;

//exit app on error
Mongoose.connection.on('error', (err) => {
  Logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

/** Print mongoose logs in dev env */
if (env.toUpperCase() === environments.DEVELOPMENT) {
  Mongoose.set('debug', true);
}

exports.connect = () => {
  Mongoose.connect(mongo.uri, {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  Logger.info('Mongodb server is now running on port 27017');
  return Mongoose.connection;
};