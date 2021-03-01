require('dotenv').config();
const Status = require('http-status');
const logger = require('../logging').Logger;

// default is 500
const errorForm = {
  error: {
    code: 500,
    message: 'Internal server error',
    errors: [],
  },
};

const errorItem = {
  reason: '',
  message: '',
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  logger.error(err);
  errorItem.message = err.message;
  errorItem.reason = err.name;
  errorForm.error.errors = [];
  if (process.env.NODE_ENV === 'development') {
    errorForm.error.errors.push(errorItem);
  }
  res.status(Status.INTERNAL_SERVER_ERROR).json(errorForm);
};

const routeNotFoundHandler = (req, res, next) => {
  if (!req.route) {
    errorForm.error.code = 404;
    errorForm.error.message = 'Route not found';
    errorForm.error.errors = [];
    res.status(Status.NOT_FOUND).json(errorForm);
  }
  next();
};

const response = (code, dataObject = null, errMsg = '', errItems = []) => {
  const success = {
    data: {},
  };
  if (errItems.length > 0 || errMsg !== '') {
    errorForm.error.code = code;
    errorForm.error.message = errMsg;
    errorForm.error.errors = errItems;
    return errorForm;
  }
  success.data = dataObject;
  return success;
};

module.exports = {
  errorHandler,
  routeNotFoundHandler,
  response,
};
