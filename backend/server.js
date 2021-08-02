'use strict'

const http = require('http')
const express = require('express');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
// require('./config/db');
// const {checkUser, requireAuth} = require('./middleware/auth.middleware');

const app = express();

//cors
const cors = require('cors');

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

// 'body-parser' (...is deprecated)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// errors
const errorHandler = error => {
  if (error.syscall !== 'listen') { throw error }

  const address = server.address()
  const bind = (typeof address === 'string') ? ('pipe ' + address) : ('port: ' + port)
  
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break
  
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break
  
      default:
      throw error
  }
}

// jwt
// app.get('*', checkUser);
// app.get('/jwtid', requireAuth, (req, res) => {
  app.get('*');
  app.get('/jwtid', (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// server
const normalizePort = val => {
  const port = parseInt(val, 10)

  if (isNaN(port)) { return val }
  
  if (port >= 0) { return port }
}

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer()

server.on('error', errorHandler)

server.on('listening', () => {
  const address = server.address()

  const bind = (typeof address === 'string') ? ('pipe ' + address) :  port

  console.log('Listening on http://localhost:' + bind)
})

server.listen(port)
