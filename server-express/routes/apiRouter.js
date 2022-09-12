const apiRouter = require('express').Router();

const tagsRouter = require('./api/tagsRouter');
const categoriesRouter = require('./api/categoriesRouter');
const searchRouter = require('./api/searchRouter');

const { User } = require('../db/models');
const placeRouter = require('./api/placeRouter');

apiRouter.use('/tags', tagsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/place', placeRouter);
// apiRouter.use('/events', eventsRouter);

apiRouter.route('/changeuser:id')
  .put(async (req, res) => {
    console.log(123312312313);
    try {
      const { id } = req.params;
      console.log(id);
      const {
        displayName, email, login, city, sex, age, about, password, repeatPass,
      } = req.body;

      const updatedUser = await User.update(
        {
          displayName,
          email,
          login,
          city,
          sex,
          age,
          about,
          password,
          repeatPass,
        },
        {
          where: { id },
          returning: true,
        },
      );
      req.session.user = {
        id: updatedUser.id,
        email: updatedUser.email,
        login: updatedUser.login,
        displayName: updatedUser.displayName,
        photo: updatedUser.photo,
        age: updatedUser.age,
        sex: updatedUser.sex,
        city: updatedUser.city,
        about: updatedUser.about,
        isAdmin: updatedUser.isAdmin,
      };
      res.json({ user: req.session.user });
    } catch (error) {
      res.json({ error: error.message });
    }
  });

module.exports = apiRouter;
