/* eslint-disable consistent-return */
const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

authRouter.post('/registration', async (req, res) => {
  try {
    const {
      displayName, email, login, city, password, repeatPass,
    } = req.body;

    if (
      displayName.length < 1
      || email.length < 1
      || login.length < 1
      || password.length < 1
      || repeatPass.length < 1
    ) {
      return res.json({ message: 'Заполните все поля' });
    }
    if (await User.findOne({ where: { email } })) {
      return res.json({ message: 'Пользователь с таким email уже существует' });
    }
    if (await User.findOne({ where: { login } })) {
      return res.json({ message: 'Пользователь с таким login уже существует' });
    }
    if (password.length < 7) {
      return res.json({ message: 'Минимальная длина пароля 8 символов' });
    }
    if (password !== repeatPass) {
      return res.json({ message: 'Пароли не совпадают' });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      res.json({ message: 'Почта должна быть указана в формате email@mail.com' });
      return;
    }
    if (!login || login.length < 3) {
      res.json({ message: 'Логин должен содержать не менее 3 символов' });
      return;
    }
    if (login.includes('/')) {
      res.json({ message: 'Логин недействителен' });
      return;
    }
    if (!password || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
      res.json({ message: 'Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      displayName,
      email,
      login,
      photo: 'default',
      age: 0,
      sex: 'default',
      city,
      about: '',
      password: hash,
      isAdmin: false,
    });

    req.session.user = {
      id: user.id,
      displayName: user.displayName,
      login: user.login,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    res.json({ message: 'success' });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = authRouter;

/* eslint-enable consistent-return */
