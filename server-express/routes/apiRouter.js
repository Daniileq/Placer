const apiRouter = require('express').Router();

const usersRouter = require('./api/usersRouter');
const tagsRouter = require('./api/tagsRouter');
const categoriesRouter = require('./api/categoriesRouter');
const searchRouter = require('./api/searchRouter');
const placeRouter = require('./api/placeRouter');
const favoriteRouter = require('./api/favoritesRouter');
const likesRouter = require('./api/likesRouter');
const placestogoRouter = require('./api/placestogoRouter');
const togosRouter = require('./api/togosRouter');
const userSettingsRouter = require('./api/userSettingsRouter');
const userPhotoRouter = require('./api/userPhotoRouter ');

apiRouter.use('/users', usersRouter);
apiRouter.use('/tags', tagsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/place', placeRouter);
apiRouter.use('/favorites', favoriteRouter);
apiRouter.use('/changeuser', userSettingsRouter);
apiRouter.use('/changeuserphoto', userPhotoRouter);
apiRouter.use('/likes', likesRouter);
apiRouter.use('/placetogo', placestogoRouter);
apiRouter.use('/togos', togosRouter);

// apiRouter.use('/events', eventsRouter);

module.exports = apiRouter;
