const assert = require('assert');
const Movie = require('../../../src/domain/Movie');
const AddMovie = require('../../../src/application/usecase/AddMovie');

describe('add movie', () => {
  let movieRepo;
  before(() => {
    const movieRepository = {
      create: (movie) => Promise.resolve(movie),
    };
    movieRepo = { movieRepository };
  });
  it('should created', async () => {
    const movie = new Movie(null, 'Movie1', 'desc movie 1', 2021);
    const addMovie = new AddMovie(movieRepo);
    const movieCreated = await addMovie.execute(movie);
    assert.strictEqual(movieCreated.title, 'Movie1');
  });
});
