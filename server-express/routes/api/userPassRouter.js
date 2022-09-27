/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
const userPassRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const upload = require('../../src/upload');

userPassRouter.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      password,
      repeatPass,
    } = req.body;

    // const uniqUser = await User.findOne({ where: { id } });

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

    if (password !== '') {
      const hash = await bcrypt.hash(password, 10);

      let updatedUser = await User.update(
        {
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
    }

    res.json({ user: req.session.user });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = userPassRouter;
