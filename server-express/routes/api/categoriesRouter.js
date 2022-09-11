const categoriesRouter = require('express').Router();
const { Category } = require('../../db/models');

categoriesRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({ data: categories });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = categoriesRouter;
