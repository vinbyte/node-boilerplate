const MovieSerializer = {
  serialize({
    id, title, desc, year,
  }) {
    return {
      id,
      title,
      desc,
      year,
    };
  },
};

module.exports = MovieSerializer;
