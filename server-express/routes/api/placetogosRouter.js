const placetogoRouter = require('express').Router();
const { PlaceToGo } = require('../../db/models');

placetogoRouter.post('/:placeId', async (req, res) => {
  const { placeId } = req.params;
  const { user } = req.session;
  const existPlaceToGo = await PlaceToGo.findOne({ where: { userId: user.id, placeId } });
  if (existPlaceToGo) {
    await PlaceToGo.destroy({ where: { id: existPlaceToGo.id } });
  } else {
    const placeToGo = await PlaceToGo.create({ userId: user.id, placeId });
    res.json({ data: placeToGo });
  }
});

module.exports = placetogoRouter;
