const placesRouter = require('express').Router();
const { Place, PlaceTag } = require('../../db/models');

placesRouter.get('/', async (req, res) => {
  try {
    const { categories, tags } = req.query;

    if (tags === 'all' && categories === 'all') {
      const places = await Place.findAll({
        include: [Place.images, {
          model: PlaceTag,
          include: PlaceTag.tag,
        }],
      });
      res.json({ data: places });
      return;
    }

    if (tags === 'all' && categories !== 'all') {
      const categoriesId = categories
        .split(' ')
        .map((categoryId) => Number(categoryId));
      const places = await Place.findAll({
        where: {
          categoryId: categoriesId,
        },
        include: [Place.images, {
          model: PlaceTag,
          include: PlaceTag.tag,
        }],
      });
      res.json({ data: places });
      return;
    }

    if (tags !== 'all' && categories === 'all') {
      const tagsId = tags.split(' ').map((tagId) => Number(tagId));
      console.log(tagsId);
      const placeTags = await PlaceTag.findAll({
        include: [{ model: Place, include: Place.images }],
        where: {
          tagId: tagsId,
        },
      });
      const places = placeTags.map((placeTag) => placeTag.Place);
      console.log(places);
      res.json({ data: places });
      return;
    }

    const tagsId = tags.split(' ').map((tagId) => Number(tagId));
    const categoriesId = categories
      .split(' ')
      .map((categoryId) => Number(categoryId));
    const placeTags = await PlaceTag.findAll({
      include: [{ model: Place, include: Place.images }],
      where: {
        categoryId: categoriesId,
        tagId: tagsId,
      },
    });
    const places = placeTags.map((placeTag) => placeTag.Place);
    res.json({ data: places });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

module.exports = placesRouter;
