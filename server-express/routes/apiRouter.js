const apiRouter = require('express').Router();

const tagsRouter = require('./api/tagsRouter');
const categoriesRouter = require('./api/categoriesRouter');
const searchRouter = require('./api/searchRouter');

const likesRouter = require('./api/likesRouter');

const { User } = require('../db/models');

const placeRouter = require('./api/placeRouter');
const userSettingsRouter = require('./api/userSettingsRouter');

apiRouter.use('/tags', tagsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/place', placeRouter);
apiRouter.use('/changeuser', userSettingsRouter);
apiRouter.use('/likes', likesRouter);
// apiRouter.use('/events', eventsRouter);

module.exports = apiRouter;
