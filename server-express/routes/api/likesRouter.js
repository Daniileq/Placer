const likesRouter = require('express').Router();
const { Like } = require('../../db/models');

likesRouter.post('/:placeId', async (req, res) => {
  const { user } = req.session;
  const { placeId } = req.params;

  try {
    const existLike = await Like.findOne({ where: { userId: user.id, placeId } });
    if (existLike) {
      await Like.destroy({ where: { id: existLike.id } });
      res.json({ data: 'disliked' });
    } else {
      await Like.create({ userId: user.id, placeId });
      res.json({ data: 'liked' });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = likesRouter;
