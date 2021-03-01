const {
  createContainer, asClass, asValue, asFunction,
} = require('awilix');
const { scopePerRequest } = require('awilix-express');
const MovieRepositoryPostgres = require('./infrastructure/repositories/MovieRepositoryPostgres');
const ListMoviesUsecase = require('./application/usecase/ListMovies');
const AddMovieUsecase = require('./application/usecase/AddMovie');
const GetMovieByIdUsecase = require('./application/usecase/GetMovieById');
const UpdateMovieUsecase = require('./application/usecase/UpdateMovie');
const DeleteMovieUsecase = require('./application/usecase/DeleteMovie');
const { Logger, LoggerMiddleware } = require('./infrastructure/logging');
const Server = require('./infrastructure/server');
const MovieController = require('./interfaces/controllers/MovieController');
const MovieSerializer = require('./interfaces/serializers/MovieSerializer');
const MovieSanitizer = require('./infrastructure/request/MovieSanitizer');
const router = require('./interfaces/routes');
const { errorHandler, routeNotFoundHandler, response } = require('./infrastructure/response');

const container = createContainer();

// Register Repositories
container.register({
  movieRepository: asClass(MovieRepositoryPostgres),
});

// Register Usecase
container.register({
  listMovies: asClass(ListMoviesUsecase),
  addMovie: asClass(AddMovieUsecase),
  getMovieById: asClass(GetMovieByIdUsecase),
  updateMovie: asClass(UpdateMovieUsecase),
  deleteMovie: asClass(DeleteMovieUsecase),
});

// Register Controller
container.register({
  movieController: asValue(MovieController),
});

// Register Route
container.register({
  router: asFunction(router),
});

// Register infra
container.register({
  movieSerializer: asValue(MovieSerializer),
  movieSanitizer: asValue(MovieSanitizer),
});

// Register Middleware
container.register({
  Logger: asValue(Logger),
  LoggerMiddleware: asValue(LoggerMiddleware),
  // need scopePerRequest because basically "container" isn't a middleware
  containerMiddleware: asValue(scopePerRequest(container)),
  response: asValue(response),
  errorHandler: asValue(errorHandler),
  routeNotFoundHandler: asValue(routeNotFoundHandler),
});

// Register App
container.register({
  Server: asClass(Server),
});

module.exports = container;
