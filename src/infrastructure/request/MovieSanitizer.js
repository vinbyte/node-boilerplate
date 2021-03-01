/* eslint-disable no-param-reassign */
const validator = require('validator').default;

module.exports = async (movie) => {
  const errors = [];
  const reason = 'ValidationError';
  if (movie.title === undefined) {
    errors.push({
      reason,
      message: 'title is required',
    });
  }
  if (movie.desc === undefined) {
    errors.push({
      reason,
      message: 'desc is required',
    });
  }
  if (movie.year === undefined) {
    errors.push({
      reason,
      message: 'year is required',
    });
  }
  if (errors.length === 0) {
    movie.title = validator.escape(validator.trim(movie.title));
    movie.desc = validator.escape(validator.trim(movie.desc));
    movie.year = validator.escape(validator.trim(movie.year));
  }
  return errors;
};
