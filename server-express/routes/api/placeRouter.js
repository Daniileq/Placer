const placeRouter = require('express').Router();
const { Place } = require('../../db/models');

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

module.exports = placeRouter;
