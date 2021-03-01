require('dotenv').config();
const express = require('express');

class Server {
  constructor({ Logger, router }) {
    this.logger = Logger;
    this.express = express();

    this.express.disable('x-powered-by');
    this.express.use(router);
  }

  start() {
    return new Promise((resolve) => {
      const http = this.express
        .listen(process.env.PORT, () => {
          const { port } = http.address();
          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;
