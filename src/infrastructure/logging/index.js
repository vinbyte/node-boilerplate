require('dotenv').config();
const { count } = require('console');
const Log4js = require('log4js');
const morgan = require('morgan');
const path = require('path');
const LoggerStreamAdapter = require('./LoggerStreamAdapter');

const logPath = path.join(__dirname, '../../../logs/server.log');

const logger = () => {
  const loggingConfig = {
    appenders: {},
    categories: { default: { appenders: [], level: 'debug' } },
  };
  const envLogging = process.env.LOGGING;
  const loggingType = envLogging.split(' ');
  loggingType.forEach((logType) => {
    if (logType === 'console') {
      loggingConfig.appenders.console = { type: 'console' };
      loggingConfig.categories.default.appenders.push('console');
    } else if (logType === 'file') {
      loggingConfig.appenders.file = { type: 'file', filename: logPath };
      loggingConfig.categories.default.appenders.push('file');
    }
  });
  if (count(loggingType) === 0) {
    loggingConfig.appenders.console = { type: 'console' };
    loggingConfig.categories.default.appenders.push('console');
  }
  Log4js.configure(loggingConfig);
  return Log4js.getLogger();
};

const LoggerMiddleware = morgan('dev', {
  stream: LoggerStreamAdapter.toStream(logger()),
});

module.exports = {
  Logger: logger(),
  LoggerStreamAdapter,
  LoggerMiddleware,
};
