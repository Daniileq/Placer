const placestogoRouter = require('express').Router();
const { PlaceToGo } = require('../../db/models');

placestogoRouter.post('/:placeId', async (req, res) => {
  const { placeId } = req.params;
  const { user } = req.session;
  try {
    const existPlaceToGo = await PlaceToGo.findOne({ where: { userId: user.id, placeId } });
    if (existPlaceToGo) {
      await PlaceToGo.destroy({ where: { id: existPlaceToGo.id } });
      res.json({ data: 'goOff' });
    } else {
      await PlaceToGo.create({ userId: user.id, placeId });
      res.json({ data: 'goOn' });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = placestogoRouter;
