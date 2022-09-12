const placeRouter = require('express').Router();
const { Place, PlaceTag, Tag } = require('../../db/models');

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

placeRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const place = await Place.findOne({
      where: { id },
      include: [
        Place.PlaceImages,
        Place.Category,
        {
          model: PlaceTag,
          include: PlaceTag.Tag,
        },
      ],
    });
    res.json({
      data: place,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

placeRouter.get('/:id/comments', async (req, res) => {
  const placeId = Number(req.params.id);
  try {
    const comments = await Comment.findAll({
      where: { placeId },
    });
    console.log(comments);
    res.json({
      data: comments,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

placeRouter.post('/:id/comments', async (req, res) => {
  const { content, placeId } = req.body;
  console.log(placeId);
  console.log(req.session.user.id);
  try {
    const newComment = await Comment.create({
      content,
      userId: req.session.user.id,
      placeId,
    });
    console.log(newComment);
    res.json({
      data: newComment,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

module.exports = placeRouter;
