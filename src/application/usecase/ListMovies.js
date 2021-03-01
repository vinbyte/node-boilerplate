const HTTPStatus = require('http-status');

class ListMovies {
  constructor({ movieRepository, movieSerializer }) {
    this.movieRepository = movieRepository;
    this.movieSerializer = movieSerializer;
  }

  async execute() {
    const movies = [];
    const result = {
      status: HTTPStatus.OK,
      data: {},
      errMsg: '',
      errors: [],
    };
    const moviesData = await this.movieRepository.listAll();
    await moviesData.forEach((movie) => {
      movies.push(this.movieSerializer.serialize(movie));
    });
    result.data = { items: movies };
    return result;
  }
}

module.exports = ListMovies;
