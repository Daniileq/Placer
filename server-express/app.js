require('dotenv').config();
const http = require('node:http');
const express = require('express');
const socketIO = require('socket.io');
const path = require('node:path');

const serverConfig = require('./config/server.config');
const testDatabaseConnection = require('./src/testDatabaseConnection');

const apiRouter = require('./routes/apiRouter');
const authRouter = require('./routes/authRouter');
const keysRouter = require('./routes/keysRouter');

const app = express();
const httpServer = http.createServer(app);
const wsServer = new socketIO.Server(httpServer);
const PORT = process.env.PORT ?? 4000;

serverConfig(app);

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/apikey', keysRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client-react/build/index.html'));
});

wsServer.on('connection', (socket) => {
  socket.on('chat:outgoing', (message) => {
    socket.emit('chat:outgoing:success', 'Сообщение принято, спасибо');
    socket.broadcast.emit('chat:incoming', message);
  });
});

httpServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on PORT: ${PORT}`);
  testDatabaseConnection();
});
