const apiRouter = require('express').Router();

apiRouter.route('/')
  .get((req, res) => {
    res.json({ data: 'Connection success' });
  });

module.exports = apiRouter;
