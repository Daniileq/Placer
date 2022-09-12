const placeRouter = require('express').Router();
const { Place } = require('../../db/models');

placeRouter.post('/', async (req, res) => {
  try {
    const { user } = req.session;
    const {
      title,
      adress,
      longitude,
      latitude,
      description,
      category,

      titleTag,
      tagId,
    } = req.body;

    console.log(
      title,
      adress,
      longitude,
      latitude,
      description,
      category,
      'categoryIdcategoryIdcategoryIdcategoryId',

      titleTag,
      'titleTagtitleTagtitleTagtitleTagtitleTagtitleTag',
      tagId
    );
    const createPlace = await Place.create({
      where: {
        userId: user.id,
        title,
        adress,
        longitude,
        latitude,
        description,
        category,
        categoryId,
      },
    });
    res.json({
      data: createPlace,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

module.exports = placeRouter;
