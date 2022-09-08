const apiRouter = require('express').Router();

apiRouter.route('/')
  .get((req, res) => {
    res.json({ success: true });
  });

module.exports = apiRouter;
