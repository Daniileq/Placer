const apiRouter = require('express').Router();

const tagsRouter = require('./api/tagsRouter');
const categoriesRouter = require('./api/categoriesRouter');
const searchRouter = require('./api/searchRouter');
const placeRouter = require('./api/placeRouter');
const favoriteRouter = require('./api/favoritesRouter');
const likesRouter = require('./api/likesRouter');
const placetogoRouter = require('./api/placetogosRouter');

const userSettingsRouter = require('./api/userSettingsRouter');

apiRouter.use('/tags', tagsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/place', placeRouter);
apiRouter.use('/favorites', favoriteRouter);
apiRouter.use('/changeuser', userSettingsRouter);
apiRouter.use('/likes', likesRouter);
// apiRouter.use('/events', eventsRouter);

apiRouter.use('/placetogos', placetogoRouter);

module.exports = apiRouter;
