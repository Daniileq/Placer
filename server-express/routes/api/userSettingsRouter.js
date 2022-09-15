/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
const userSettingsRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const upload = require('../../src/upload');

userSettingsRouter.put('/:id', upload.any(), async (req, res) => {
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
      tgUsername,
      password,
      repeatPass,
    } = req.body;

    const routesArr = ['profile', 'newplace', 'settings', 'favorites', 'about', 'contacts', 'togo', 'registration', 'login', 'places'];

    const uniqUser = await User.findOne({ where: { id } });

    if (uniqUser.dataValues.email !== email) {
      if (await User.findOne({ where: { email } })) {
        return res.json({
          message: 'Пользователь с таким email уже существует',
        });
      }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.json({
          message: 'Почта должна быть указана в формате email@mail.com',
        });
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
        return res.json({
          message:
              'Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы',
        });
      }
    }
    if (!login || login.length < 3) {
      return res.json({ message: 'Логин должен содержать не менее 3 символов' });
    }
    if (login.includes('/')) {
      return res.json({ message: 'Логин недействителен' });
    }
    if (routesArr.includes(login)) {
      return res.json({ message: 'Такой логин нельзя использовать' });
    }

    if (password !== '') {
      const hash = await bcrypt.hash(password, 10);

      let updatedUser = await User.update(
        {
          photo: req.file ? `/images/${req.file.filename}` : uniqUser.photo,
          displayName,
          email,
          login,
          city,
          sex,
          age,
          about,
          tgUsername,
          password: hash,
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
        tgUsername: updatedUser.tgUsername,
        isAdmin: updatedUser.isAdmin,
      };
    } else {
      let updatedUser = await User.update(
        {
          photo: req.file ? `/images/${req.file.filename}` : uniqUser.photo,
          displayName,
          email,
          login,
          city,
          sex,
          age,
          about,
          tgUsername,
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
        tgUsername: updatedUser.tgUsername,
        isAdmin: updatedUser.isAdmin,
      };
    }

    res.json({ user: req.session.user });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = userSettingsRouter;
