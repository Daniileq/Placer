const searchRouter = require('express').Router();
const { Place, PlaceTag } = require('../../db/models');

searchRouter.get('/', async (req, res) => {
  try {
    const { categories, tags } = req.query;

    if (tags === 'all' && categories === 'all') {
      const places = await Place.findAll({
        include: [
          Place.PlaceImages,
          Place.Category,
          {
            model: PlaceTag,
            include: PlaceTag.Tag,
          },
        ],
      });

      res.json({ data: places });
      return;
    }

    if (tags === 'all' && categories !== 'all') {
      const categoriesId = categories
        .split(' ').map((categoryId) => Number(categoryId));
      const places = await Place.findAll({
        where: {
          categoryId: categoriesId,
        },
        include: [
          Place.PlaceImages,
          Place.Category,
          {
            model: PlaceTag,
            include: PlaceTag.Tag,
          },
        ],
      });
      res.json({ data: places });
      return;
    }

    if (tags !== 'all' && categories === 'all') {
      const tagsId = tags
        .split(' ').map((tagId) => Number(tagId));
      const places = await Place.findAll({
        include: [
          Place.PlaceImages,
          Place.Category,
          {
            model: PlaceTag,
            where: {
              tagId: tagsId,
            },
            include: PlaceTag.Tag,
          },
        ],
      });
      res.json({ data: places });
      return;
    }

    const tagsId = tags
      .split(' ').map((tagId) => Number(tagId));
    const categoriesId = categories
      .split(' ').map((categoryId) => Number(categoryId));

    const places = await Place.findAll({
      where: {
        categoryId: categoriesId,
      },
      include: [
        Place.PlaceImages,
        Place.Category,
        {
          model: PlaceTag,
          where: {
            tagId: tagsId,
          },
          include: PlaceTag.Tag,
        },
      ],
    });

    res.json({ data: places });
  } catch (error) {
    // console.log(error.message);
    res.json({ error: error.message });
  }
});

module.exports = searchRouter;
