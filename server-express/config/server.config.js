const express = require('express');
const morgan = require('morgan');
const path = require('path');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');

const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

module.exports = function serverConfig(app) {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(express.static(path.resolve('public')));
  app.use(express.urlencoded({ extended: true }));
};
