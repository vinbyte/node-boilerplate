const assert = require('assert');
const Movie = require('../../../src/domain/Movie');
const AddMovie = require('../../../src/application/usecase/AddMovie');

describe('add movie', () => {
  before(() => {
    
  });
  it('should created', async () => {
    const movieRepository = {
      create: (movie) => Promise.resolve(movie),
    };
    const movieSanitizer = (movie) => {
      return []
    }
    const movieSerializer = {
      serialize: (newMovie) => Promise.resolve(newMovie)
    }
    const movieRepo = { movieRepository,movieSanitizer,movieSerializer };

    const movie = new Movie(null, 'Movie1', 'desc movie 1', 2021);
    const addMovie = new AddMovie(movieRepo);
    const response = await addMovie.execute(movie);
    assert.strictEqual(response.data.item.title, 'Movie1');
  });
  it('should sanitize error', async ()=>{
    const movieRepository = {
      create: (movie) => Promise.resolve(movie),
    };
    const movieSanitizer = (movie) => {
      return [{
        reason: 'ValidationError',
        message: 'title is required',
      }]
    }
    const movieSerializer = {
      serialize: (newMovie) => Promise.resolve(newMovie)
    }
    const movieRepo = { movieRepository,movieSanitizer,movieSerializer };
    const movie = new Movie(null, '', 'desc movie 1', 2021);
    const addMovie = new AddMovie(movieRepo);
    const response = await addMovie.execute(movie);
    assert.strictEqual(response.errors.length, 1);
    assert.strictEqual(Object.keys(response.data).length, 0)
    assert.strictEqual(response.status, 400)
  })
  it('should failed add', async ()=>{
    const movieRepository = {
      create: (movie) => null,
    };
    const movieSanitizer = (movie) => {
      return []
    }
    const movieSerializer = {
      serialize: (newMovie) => Promise.resolve(newMovie)
    }
    const movieRepo = { movieRepository,movieSanitizer,movieSerializer };
    const movie = new Movie(null, 'title 1', 'desc movie 1', 2021);
    const addMovie = new AddMovie(movieRepo);
    const response = await addMovie.execute(movie);
    assert.strictEqual(response.errors.length, 0);
    assert.notStrictEqual(response.errMsg, '');
    assert.strictEqual(Object.keys(response.data).length, 0)
    assert.strictEqual(response.status, 500)
  })
});
