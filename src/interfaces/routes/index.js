require('dotenv').config();
const { Router } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = ({
  movieController, LoggerMiddleware, containerMiddleware, errorHandler, routeNotFoundHandler,
}) => {
  const router = Router();
  if (process.env.NODE_ENV !== 'test') {
    router.use(LoggerMiddleware);
  }

  router
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(containerMiddleware);
  // .use('/docs', swaggerMiddleware);

  // Set up the routing.
  const v1 = Router();
  v1.get('/movies', movieController.getAllMovie);
  v1.get('/movies/:id', movieController.detailMovie);
  v1.post('/movies', movieController.insertMovie);
  v1.post('/movies/:id', movieController.updateMovie);
  v1.delete('/movies/:id', movieController.deleteMovie);

  router.use('/v1', v1);
  router.use(routeNotFoundHandler);
  router.use(errorHandler);
  return router;
};
