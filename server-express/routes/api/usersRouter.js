const usersRouter = require('express').Router();
const { User, PlaceToGo } = require('../../db/models');

usersRouter.get('/togo/:placeId', async (req, res) => {
  const { placeId } = req.params;
  try {
    const userLoginsToGo = (await User.findAll({
      include: {
        model: PlaceToGo,
        where: Number(placeId),

      },
      attributes: ['login'],
    })).map((user) => user.login);

    res.json({ data: userLoginsToGo });
  } catch (error) {
    res.json({ error: error.message });
  }
});

usersRouter.get('/:login', async (req, res) => {
  const { login } = req.params;
  try {
    const user = await User.findOne({
      where: login,
      attributes: [
        'login',
        'displayName',
        'photo',
        'age',
        'sex',
        'city',
        'about',
      ],
    });
    res.json({ data: user });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = usersRouter;
