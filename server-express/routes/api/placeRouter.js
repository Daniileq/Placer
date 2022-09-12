const placeRouter = require('express').Router();

const {
  Place, Tag, PlaceTag, PlaceImage,
} = require('../../db/models');
const upload = require('../../src/upload');

placeRouter.post('/', upload.array('placeImages'), async (req, res) => {
  try {
    console.log(req.session);
    if (!req.session || !req.session.user) {
      res.json({
        error: 'no user',
      });
      return;
    }
    const { user } = req.session;
    const {
      title,
      adress,
      longitude,
      latitude,
      categoryId,
      description,
    } = req.body;

    const { id } = await Place.create({
      userId: user.id,
      title,
      adress,
      longitude,
      latitude,
      description,
      categoryId,
      isModerated: true,
      isDeleted: false,
    });

    console.log('sadasd');

    const tags = await Tag.findAll();

    const placeTagsId = [];
    for (let tagIndex = 0; tagIndex < tags.length; tagIndex += 1) {
      if (req.body[`tags_${tagIndex}`]) {
        placeTagsId.push(tags[tagIndex].id);
      }
    }

    await PlaceTag.bulkCreate(placeTagsId.map((placeTag) => ({
      placeId: id,
      tagId: Number(placeTag),
    })));

    await PlaceImage.bulkCreate(req.files.map((file) => ({
      src: file.filename,
      placeId: id,
      title: file.originalname,
    })));

    res.json({
      success: true,
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
