const HTTPStatus = require('http-status');
const validator = require('validator').default;

class DeleteMovie {
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
    const moviesData = await this.movieRepository.delete(id);
    if (moviesData == null) {
      result.status = HTTPStatus.INTERNAL_SERVER_ERROR;
      result.errMsg = 'Failed delete movie';
      return result;
    }
    result.data.item = await this.movieSerializer.serialize(moviesData);
    return result;
  }
}

module.exports = DeleteMovie;
