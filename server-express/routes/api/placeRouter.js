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

module.exports = placeRouter;
