/**
 * This logger implements Winston module for writing custom logs
 * 
 * @package https://github.com/winstonjs/winston
 */

const Winston = require('winston');

const logger = Winston.createLogger({
  level: 'info',
  format: Winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new Winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new Winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new Winston.transports.Console({ format: Winston.format.simple() }));
}

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
