const likesRouter = require('express').Router();
const { Like } = require('../../db/models');

likesRouter.post('/:placeId', async (req, res) => {
  const { user } = req.session;
  const { placeId } = req.params;

  const existLike = await Like.findOne({ where: { userId: user.id, placeId } });
  if (existLike) {
    await Like.destroy({ where: { id: existLike.id } });
  } else {
    const like = await Like.create({ userId: user.id, placeId });
    res.json({ data: like });
  }
});

module.exports = likesRouter;
