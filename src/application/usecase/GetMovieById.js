const HTTPStatus = require('http-status');
const validator = require('validator').default;

class GetMovieById {
  constructor({ movieRepository, movieSerializer }) {
    this.movieRepository = movieRepository;
    this.movieSerializer = movieSerializer;
  }

  async execute(movieId) {
    const result = {
      status: HTTPStatus.OK,
      data: {},
      errMsg: '',
      errors: [],
    };
    const id = validator.escape(validator.trim(movieId));
    if (id < 1 || id == null) {
      result.errors.push({
        reason: 'ValidationError',
        message: 'id is required',
      });
    }
    const moviesData = await this.movieRepository.getById(id);
    if (moviesData == null) {
      result.status = HTTPStatus.INTERNAL_SERVER_ERROR;
      result.errMsg = 'Failed get movie';
      return result;
    }
    result.data.item = await this.movieSerializer.serialize(moviesData);
    return result;
  }
}

module.exports = GetMovieById;
