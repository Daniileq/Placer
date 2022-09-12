const favoritesRouter = require('express').Router();
const { Place, PlaceTag, Like } = require('../../db/models');

favoritesRouter.get('/', async (req, res) => {
  try {
    const likes = await Like.findAll({
      where: {
        userId: req.session.user.id,
      },
      include: [
        {
          model: Place,
          include: [
            Place.PlaceImages,
            Place.Category,
            {
              model: PlaceTag,
              include: PlaceTag.Tag,
            },
          ],
        },
      ],
    });

    const favoritePlaces = likes.map((like) => like.Place);

    res.json({ data: favoritePlaces });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = favoritesRouter;
