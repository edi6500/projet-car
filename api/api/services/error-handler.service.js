const Logger = require('../../config/logger.config'),
      Notifier = require('node-notifier'),
      Boom = require('boom');

/**
 * Write errors in a log file
 * 
 * @param {*} err 
 * @param {*} str 
 * @param {*} req 
 */
exports.log = (err, str, req) => {
  let message = 'Error in ' + req.method + ' ' + req.url + ' : ' + str + '\n';
  Logger.error(message);
};

/**
 * Display error in desktop notification
 * 
 * @param {*} err 
 * @param {*} str 
 * @param {*} req 
 * 
 * @requires libnotify-bin
 */
exports.notify = (err, str, req) => {
  let title = 'Error in ' + req.method + ' ' + req.url;
  Notifier.notify({
    title : title,
    message : str
  });
};

/**
 * Display clean error for final user
 * 
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.exit = (err, req, res, next) => {
  let code = typeof(err.httpStatusCode) !== 'undefined' ? err.httpStatusCode : 500;
  res.status(code);
  res.json(err);
};

/**
 * Display clean error for final user when whe are on the last stack step
 * 
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.notFound = (req, res, next) => {
  res.json( Boom.notFound('End point not found') );
};