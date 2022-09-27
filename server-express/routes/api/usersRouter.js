const usersRouter = require('express').Router();
const {
  User, Place, PlaceToGo, PlaceTag, PlaceImage,
} = require('../../db/models');

usersRouter.get('/togo/:placeId', async (req, res) => {
  const { placeId } = req.params;
  try {
    const userLoginsToGo = (await User.findAll({
      include: {
        model: PlaceToGo,
        where: {
          placeId: Number(placeId),
        },
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
    const person = await User.findOne({
      where: { login },
      attributes: [
        'id',
        'login',
        'displayName',
        'photo',
        'age',
        'sex',
        'city',
        'about',
        'tgUsername',
      ],
    });

    res.json({ data: person });
  } catch (error) {
    res.json({ error: error.message });
  }
});

usersRouter.get('/:personId/places/', async (req, res) => {
  const { personId } = req.params;
  try {
    const personPlaces = await Place.findAll({
      where: {
        userId: Number(personId),
      },
      order: [
        [PlaceImage, 'id', 'ASC'],
      ],
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

    res.json({ data: personPlaces });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = usersRouter;
