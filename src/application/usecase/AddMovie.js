const HTTPStatus = require('http-status');

class AddMovie {
  constructor({ movieRepository, movieSanitizer, movieSerializer }) {
    this.movieRepository = movieRepository;
    this.movieSanitizer = movieSanitizer;
    this.movieSerializer = movieSerializer;
  }

  async execute(movie) {
    const result = {
      status: HTTPStatus.OK,
      data: {},
      errMsg: '',
      errors: [],
    };
    result.errors = await this.movieSanitizer(movie);
    if (result.errors.length > 0) {
      result.status = HTTPStatus.BAD_REQUEST;
      result.errMsg = 'Failed add movie';
    } else {
      let newMovie = await this.movieRepository.create(movie);
      if (newMovie != null) {
        newMovie = await this.movieSerializer.serialize(newMovie);
        result.data = { item: newMovie };
      } else {
        result.errMsg = 'Failed add movie';
        result.status = HTTPStatus.INTERNAL_SERVER_ERROR;
      }
    }

    return result;
  }
}

module.exports = AddMovie;
