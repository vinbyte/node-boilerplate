module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('movies', [{
      title: 'Iron Man',
      desc: 'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors. Returning to America, Stark refines the suit and uses it to combat crime and terrorism.',
      year: 2008,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Fast and Furious',
      desc: 'Fast & Furious is a media franchise centered on a series of action films that are largely concerned with illegal street racing, heists and spies. The franchise also includes short films, a television series, live shows, video games and theme park attractions. It is distributed by Universal Pictures',
      year: 2001,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('movies', null, {});
  },
};
