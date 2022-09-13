const togosRouter = require('express').Router();
const { Place, PlaceTag, PlaceToGo } = require('../../db/models');

togosRouter.get('/', async (req, res) => {
  try {
    const togos = await PlaceToGo.findAll({
      where: {
        userId: req.session.user.id,
      },
      include: [
        {
          model: Place,
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
        },
      ],
    });

    const togosPlaces = togos.map((togo) => togo.Place);

    res.json({ data: togosPlaces });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = togosRouter;
