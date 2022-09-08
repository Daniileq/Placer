require('dotenv').config();
const express = require('express');

const serverConfig = require('./config/server.config');
const testDatabaseConnection = require('./src/testDatabaseConnection');

const apiRouter = require('./routes/apiRouter');
const authRouter = require('./routes/authRouter');

const app = express();
const PORT = process.env.PORT ?? 4000;

serverConfig(app);

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on PORT: ${PORT}`);
  testDatabaseConnection();
});
