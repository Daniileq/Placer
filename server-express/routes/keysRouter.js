const apiRouter = require('express').Router();

apiRouter.route('/')
  .get((req, res) => {
    res.json({ API_KEY: process.env.API_KEY });
  });

module.exports = apiRouter;
