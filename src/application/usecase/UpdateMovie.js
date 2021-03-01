const HTTPStatus = require('http-status');
const validator = require('validator').default;

class UpdateMovie {
  constructor({ movieRepository, movieSerializer, movieSanitizer }) {
    this.movieRepository = movieRepository;
    this.movieSerializer = movieSerializer;
    this.movieSanitizer = movieSanitizer;
  }

  async execute(movieId, movieData) {
    const result = {
      status: HTTPStatus.OK,
      data: {},
      errMsg: '',
      errors: [],
    };
    const movieDataUpdated = { title: movieData.title, desc: movieData.desc, year: movieData.year };
    result.errors = await this.movieSanitizer(movieDataUpdated);
    const id = validator.escape(validator.trim(movieId));
    if (id < 1 || id == null) {
      result.errors.push({
        reason: 'ValidationError',
        message: 'id is required',
      });
    }
    if (result.errors.length > 0) {
      result.status = HTTPStatus.BAD_REQUEST;
      result.errMsg = 'Failed update movie';
      return result;
    }
    const newMovie = await this.movieRepository.update(id, movieDataUpdated);
    if (newMovie == null) {
      result.status = HTTPStatus.INTERNAL_SERVER_ERROR;
      result.errMsg = 'Failed update movie';
      return result;
    }
    const item = await this.movieSerializer.serialize(newMovie);
    result.data.item = item;
    return result;
  }
}

module.exports = UpdateMovie;
