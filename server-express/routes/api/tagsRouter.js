const tagsRouter = require('express').Router();
const { Tag } = require('../../db/models');

tagsRouter.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        Tag.PlaceTags,
      ],
    });
    res.json({ data: tags });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = tagsRouter;
