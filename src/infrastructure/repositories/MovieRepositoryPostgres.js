const sequelize = require('../database/sequelize/sequelize');
const Movie = require('../../domain/Movie');

module.exports = class {
  constructor() {
    // super();
    this.db = sequelize.sequelize;
    this.model = this.db.model('movie');
  }

  async create(movieData) {
    const {
      title, desc, year,
    } = movieData;
    const movieModel = await this.model.create({
      title, desc, year,
    });

    return new Movie(movieModel.id, movieModel.title, movieModel.desc, movieModel.year);
  }

  async listAll() {
    const movies = await this.model.findAll({
      order: [
        ['id', 'DESC'],
      ],
    });
    return movies.map((movie) => new Movie(movie.id, movie.title, movie.desc, movie.year));
  }

  async getById(movieId) {
    const movie = await this.model.findByPk(movieId);
    return movie;
  }

  async update(movieId, movieData) {
    await this.model.update(movieData, {
      where: {
        id: movieId,
      },
    });
    return new Movie(movieId, movieData.title, movieData.desc, movieData.year);
  }

  async delete(movieId) {
    let movie = null;
    const transaction = await this.db.transaction();
    try {
      movie = await this.model.findByPk(movieId);
      await this.model.destroy({
        where: {
          id: movieId,
        },
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
    return movie;
  }
};
