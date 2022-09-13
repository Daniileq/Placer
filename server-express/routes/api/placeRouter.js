const placeRouter = require('express').Router();
const {
  Place, PlaceTag, Tag, Comment,
} = require('../../db/models');

placeRouter.post('/', async (req, res) => {
  try {
    const {
      title, adress, description, category,
    } = req.body;
    console.log(title, adress, description, category);
    const createPlace = await Place.create({
      where: {
        title, adress, description, category,
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
      include: Comment.User,
    });
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
  try {
    await Comment.create({
      content,
      userId: req.session.user.id,
      placeId,
    });
    const newComment = await Comment.findOne({
      where: { placeId },
      include: Comment.User,
    });
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
