/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
const apiRouter = require('express').Router();
const bcrypt = require('bcrypt');

const tagsRouter = require('./api/tagsRouter');
const categoriesRouter = require('./api/categoriesRouter');
const searchRouter = require('./api/searchRouter');

const { User } = require('../db/models');
const placeRouter = require('./api/placeRouter');
const placetogoRouter = require('./api/placetogosRouter');

apiRouter.use('/tags', tagsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/place', placeRouter);
// apiRouter.use('/events', eventsRouter);

apiRouter.use('/placetogos', placetogoRouter);
apiRouter.route('/changeuser:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      displayName,
      email,
      login,
      city,
      sex,
      age,
      about,
      password,
      repeatPass,
    } = req.body;

    const uniqUser = await User.findOne({ where: { id } });

    if (uniqUser.dataValues.email !== email) {
      if (await User.findOne({ where: { email } })) {
        return res.json({
          message: 'Пользователь с таким email уже существует',
        });
      }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        res.json({
          message: 'Почта должна быть указана в формате email@mail.com',
        });
        return;
      }
    }
    if (uniqUser.dataValues.login !== login) {
      if (await User.findOne({ where: { login } })) {
        return res.json({
          message: 'Пользователь с таким login уже существует',
        });
      }
    }
    if (password.length > 1) {
      if (password.length < 7) {
        return res.json({ message: 'Минимальная длина пароля 8 символов' });
      }
      if (password !== repeatPass) {
        return res.json({ message: 'Пароли не совпадают' });
      }
      if (!password || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        res.json({
          message:
            'Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы',
        });
        return;
      }
    }
    if (!login || login.length < 3) {
      res.json({ message: 'Логин должен содержать не менее 3 символов' });
      return;
    }
    if (login.includes('/')) {
      res.json({ message: 'Логин недействителен' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    let updatedUser = await User.update(
      {
        displayName,
        email,
        login,
        city,
        sex,
        age,
        about,
        password: hash,
        repeatPass,
      },
      {
        where: { id },
        raw: true,
        returning: true,
      },
    );

    updatedUser = updatedUser[1][0];

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
