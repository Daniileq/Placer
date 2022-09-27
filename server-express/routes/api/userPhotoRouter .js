/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
const userPhotoRouter = require('express').Router();
const { User } = require('../../db/models');
const upload = require('../../src/upload');

userPhotoRouter.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const uniqUser = await User.findOne({ where: { id } });

    let updatedUser = await User.update(
      {
        photo: req.file ? `/static/media${req.file.filename}` : uniqUser.photo,
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

module.exports = userPhotoRouter;
