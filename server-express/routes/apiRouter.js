const apiRouter = require('express').Router();
const tagsRouter = require('./api/tagsRouter');
const categoriesRouter = require('./api/categoriesRouter');
const placesRouter = require('./api/placesRouter');

apiRouter.use('/tags', tagsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/places', placesRouter);
// apiRouter.use('/events', eventsRouter);

module.exports = apiRouter;
