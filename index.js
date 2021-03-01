const container = require('./src/container');

const Server = container.resolve('Server');
Server.start();
