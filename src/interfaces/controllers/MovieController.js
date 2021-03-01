const Status = require('http-status');
const Movie = require('../../domain/Movie');

const MovieController = {
  // eslint-disable-next-line no-unused-vars
  async getAllMovie(req, res, next) {
    try {
      const responseBuilder = await req.container.resolve('response');
      const listMoviesUsecase = await req.container.resolve('listMovies');
      const responseData = await listMoviesUsecase.execute();
      const response = responseBuilder(
        responseData.status, responseData.data, responseData.errMsg, responseData.errors,
      );
      res
        .status(Status.OK)
        .json(response);
    } catch (error) {
      next(error);
    }
  },

  async insertMovie(req, res, next) {
    try {
      const responseBuilder = await req.container.resolve('response');
      const movie = new Movie(null, req.body.title, req.body.desc, req.body.year);
      const addMovieUsecase = await req.container.resolve('addMovie');
      const responseData = await addMovieUsecase.execute(movie);
      const response = responseBuilder(
        responseData.status, responseData.data, responseData.errMsg, responseData.errors,
      );
      res
        .status(responseData.status)
        .json(response);
    } catch (error) {
      next(error);
    }
  },

  async updateMovie(req, res, next) {
    try {
      const responseBuilder = await req.container.resolve('response');
      const movieId = req.params.id;
      const movie = new Movie(null, req.body.title, req.body.desc, req.body.year);
      const updateMovieUsecase = await req.container.resolve('updateMovie');
      const responseData = await updateMovieUsecase.execute(movieId, movie);
      const response = responseBuilder(
        responseData.status, responseData.data, responseData.errMsg, responseData.errors,
      );
      res
        .status(responseData.status)
        .json(response);
    } catch (error) {
      next(error);
    }
  },

  async detailMovie(req, res, next) {
    try {
      const responseBuilder = await req.container.resolve('response');
      const getMovieByIdUsecase = await req.container.resolve('getMovieById');
      const responseData = await getMovieByIdUsecase.execute(req.params.id);
      const response = responseBuilder(
        responseData.status, responseData.data, responseData.errMsg, responseData.errors,
      );
      res
        .status(responseData.status)
        .json(response);
    } catch (error) {
      next(error);
    }
  },

  async deleteMovie(req, res, next) {
    try {
      const responseBuilder = await req.container.resolve('response');
      const deleteMovieUsecase = await req.container.resolve('deleteMovie');
      const responseData = await deleteMovieUsecase.execute(req.params.id);
      const response = responseBuilder(
        responseData.status, responseData.data, responseData.errMsg, responseData.errors,
      );
      res
        .status(responseData.status)
        .json(response);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = MovieController;
