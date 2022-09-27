const placeRouter = require('express').Router();

const {
  Place, Tag, PlaceTag, PlaceImage, Comment, User,
} = require('../../db/models');
const upload = require('../../src/upload');

placeRouter.post('/', upload.array('placeImages'), async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      res.json({
        error: 'no user',
      });
      return;
    }
    const { user } = req.session;
    const {
      title,
      address,
      longitude,
      latitude,
      categoryId,
      description,
    } = req.body;

    const { id } = await Place.create({
      userId: user.id,
      title,
      address,
      longitude,
      latitude,
      description,
      categoryId,
      isModerated: true,
      isDeleted: false,
    });

    // TODO переделать
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
      src: `/static/media/${file.filename}`,
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
        Place.Likes,
        Place.PlaceToGos,
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

placeRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const place = await Place.findOne({
      where: { id },
    });
    place.isDeleted = true;
    await place.save();

    res.json({
      data: place,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

placeRouter.put('/:id', upload.array('placeImages'), async (req, res) => {
  const id = Number(req.params.id);

  const { user } = req.session;
  const {
    title,
    address,
    longitude,
    latitude,
    categoryId,
    description,
  } = req.body;

  try {
    await Place.update(
      {
        userId: user.id,
        title,
        address,
        longitude: Number(longitude),
        latitude: Number(latitude),
        description,
        categoryId: Number(categoryId),
        isModerated: true,
        isDeleted: false,
      },
      {
        where: { id },
      },
    );
    const tags = await Tag.findAll();

    const placeTagsId = [];
    for (let tagIndex = 0; tagIndex < tags.length; tagIndex += 1) {
      if (req.body[`tags_${tagIndex}`]) {
        placeTagsId.push(tags[tagIndex].id);
      }
    }
    await PlaceTag.destroy({ where: { placeId: id } });

    await PlaceTag.bulkCreate(placeTagsId.map((placeTag) => ({
      placeId: id,
      tagId: Number(placeTag),
    })));

    await PlaceImage.bulkCreate(req.files.map((file) => ({
      src: `/images/${file.filename}`,
      placeId: id,
      title: file.originalname,
    })));

    const place = await Place.findOne({
      where: { id },
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
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: User,
          attributes: [
            'login',
          ],
        },
      ],
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
    const newComment = await Comment.create({
      content,
      userId: req.session.user.id,
      placeId,
    });
    res.json({
      data: {
        ...newComment.dataValues,
        User: {
          login: req.session.user.login,
        },
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

placeRouter.put('/:id/comments', async (req, res) => {
  const { content, commentId } = req.body;
  try {
    const updatedComment = await Comment.update({
      content,
    }, {
      where: { id: commentId },
      returning: true,
    });
    res.json({
      data: {
        ...updatedComment[1][0].dataValues,
        User: {
          login: req.session.user.login,
        },
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

placeRouter.delete('/:id/comments', async (req, res) => {
  const { commentId } = req.body;
  try {
    await Comment.destroy({ where: { id: commentId } });
    res.json({
      data: {
        commentId,
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

module.exports = placeRouter;
