const apiRouter = require('express').Router();

const tagsRouter = require('./api/tagsRouter');
const categoriesRouter = require('./api/categoriesRouter');
const searchRouter = require('./api/searchRouter');
const placeRouter = require('./api/placeRouter');
const userSettingsRouter = require('./api/userSettingsRouter');

apiRouter.use('/tags', tagsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/place', placeRouter);
apiRouter.use('/changeuser', userSettingsRouter);
// apiRouter.use('/events', eventsRouter);

module.exports = apiRouter;
