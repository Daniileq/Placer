/* eslint-disable consistent-return */
const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Place, PlaceTag } = require('../db/models');

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
      res.json({
        message: 'Почта должна быть указана в формате email@mail.com',
      });
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
      res.json({
        message:
          'Пароль должен быть не менее 8 символов, а также содержать не менее одной цифры, одной прописной и строчной буквы',
      });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      password: hash,
      email,
      login,
      displayName,
      photo: '',
      age: '',
      sex: '',
      city,
      about: '',
      isAdmin: false,
    });

    req.session.user = {
      id: user.id,
      email: user.email,
      login: user.login,
      displayName: user.displayName,
      photo: user.photo,
      age: user.age,
      sex: user.sex,
      city: user.city,
      about: user.about,
      places: [],
      isAdmin: user.isAdmin,
    };

    res.json({ user: req.session.user });
  } catch (error) {
    res.json({ error: error.message });
  }
});

authRouter.post('/login', async (req, res) => {
  if (req.body.email.length < 1 || req.body.password.length < 1) {
    return res.json({ message: 'Заполните все поля' });
  }

  if (req.body.email.length > 4 && req.body.password.length > 7) {
    let user;
    try {
      user = await User.findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        res.json({ message: 'Неверный email и/или пароль' });
        return;
      }
    } catch (error) {
      res.json({ error: error.message });
      return;
    }

    try {
      const compPass = await bcrypt.compare(req.body.password, user.password);
      if (!compPass) {
        res.json({ message: 'Неверный email и/или пароль' });
        return;
      }
    } catch (error) {
      res.json({ error: error.message });
      return;
    }

    const userPlaces = await Place.findAll({
      where: {
        userId: user.id,
      },
      include: [
        Place.PlaceImages,
        Place.Category,
        Place.Likes,
        Place.PlaceToGos,
        {
          model: PlaceTag,
          include: PlaceTag.Tag,
        },
      ],
    });

    req.session.user = {
      id: user.id,
      email: user.email,
      login: user.login,
      displayName: user.displayName,
      photo: user.photo,
      age: user.age,
      sex: user.sex,
      city: user.city,
      about: user.about,
      places: userPlaces,
      isAdmin: user.isAdmin,
    };

    res.json({ user: req.session.user });
  } else {
    res.json({ message: 'Слишком короткий email и/или пароль.' });
  }
});

authRouter.delete('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: 'Не удалось выйти' });
      return;
    }
    res.clearCookie('user_sid');
    res.json({ message: 'success' });
  });
});

authRouter.get('/', (req, res) => {
  const { user } = req.session;
  if (user) {
    res.json({ isUser: true, user });
  } else {
    res.json({ isUser: false });
  }
});

module.exports = authRouter;

/* eslint-enable consistent-return */
